const options = {
  selector: "#focus-trail",
  app: "#demo",
  form: {
    fieldWrapper: ".input",
  },
  events: {
    attach: {
      types: ["keyup", "click", "resize", "scroll"],
      keys: {
        tab: 9,
      },
    },
    detach: {
      types: [],
    },
  },
  focusable: {
    include: ["button", "input", "textarea", "select", "details", "a[href]"],
    exclude: [
      "[aria-hidden='true']",
      "[hidden]",
      "[disabled]",
      "[tabindex='-1']",
      ".disabled",
    ],
  },
  inputNodes: ["input", "textarea", "select"],
  requiredStyles: {
    outline: "2px solid",
    outlineColor: "currentColor",
    transform: "scale(1)",
  },
};

class Event {
  constructor({
    add,
    remove,
    controller = new AbortController(),
    target = window,
  }) {
    this.controller = controller;
    this.target = target;
    this.type = {
      add,
      remove,
    };
  }
  cancel() {
    this.controller.abort();
    return this;
  }
  unsubscribe() {
    this.subscribe(this.listener, this.options, "remove");
    return this;
  }
  subscribe(listener, options = {}, stack = "add") {
    this.listener = listener;
    this.options = {
      capture: options.capture || false,
      once: options.once || false,
      signal: this.controller.signal,
    };

    const types = !Array.isArray(this.type[stack])
      ? [this.type[stack]]
      : this.type[stack];

    for (const type of types) {
      this.options.passive = options.passive || type === "scroll";
      this.target[`${stack}EventListener`](type, this.listener, this.options);
    }
    return this;
  }
}

class Helper {
  convertToRem(numerator) {
    const root = document.documentElement;
    const font = getComputedStyle(root).fontSize;
    const denominator = parseFloat(font);
    return `${numerator / denominator}rem`;
  }
  isObject(obj) {
    return obj && typeof obj === "object" && !Array.isArray(obj);
  }
}

class Iterator {
  map(obj, fn) {
    let head, tail;
    if (new Helper().isObject(obj)) {
      head = Object.keys(obj)[0];
      const { [head]: value, ...tail } = obj;

      return !head && !Object.values(tail).length
        ? {}
        : {
            ...this.map(tail, fn),
            [head]: fn(value, head),
          };
    }
    [head, ...tail] = obj;
    return !head && !tail.length ? [] : [...this.map(tail, fn), fn(head)];
  }
  filter(obj, fn) {
    let head, tail;
    if (new Helper().isObject(obj)) {
      head = Object.keys(obj)[0];
      const { [head]: value, ...tail } = obj;

      return !head
        ? {}
        : fn(value, head)
        ? { [head]: value, ...this.filter(tail, fn) }
        : { ...this.filter(tail, fn) };
    }
    [head, ...tail] = obj;
    return !head
      ? []
      : fn(head)
      ? [head, ...this.filter(tail, fn)]
      : [...this.filter(tail, fn)];
  }
  reduce(obj, fn, acc = {}) {
    let head, tail;
    if (new Helper().isObject(obj)) {
      head = Object.keys(obj)[0];
      const { [head]: value, ...tail } = obj;
      return !head ? acc : this.reduce(tail, fn, fn(acc, value, head));
    }
    [head, ...tail] = obj;
    return !head ? acc : this.reduce(tail, fn, fn(acc, head));
  }
}

class Query {
  allFocusableNodes(parent = options.app) {
    return [
      ...(document.querySelector(parent) || document).querySelectorAll(
        options.focusable.include
          .map(
            (name) =>
              `${name}${options.focusable.exclude
                .map((attr) => `:not(${attr})`)
                .join("")}`,
          )
          .join(", "),
      ),
    ];
  }
  activeNodeState(target = document.activeElement) {
    let { top, left, width, height } = target.getBoundingClientRect();
    const { color, borderRadius } = getComputedStyle(target);
    return {
      ...new Iterator().map(
        {
          top,
          left,
          width,
          height,
        },
        new Helper().convertToRem,
      ),
      ...options.requiredStyles,
      borderRadius,
      color,
    };
  }
}

class FocusFlow {
  constructor({ selector, actionKey, wrapper }) {
    this.selector = selector;
    this.actionKey = actionKey;
    this.wrapper = document.querySelector(wrapper) || document.body;
    this.node = this.wrapper.querySelector(selector);
  }

  mountNode() {
    const isId = this.selector.includes("#");
    const isClass = this.selector.includes(".");
    const name = isId || isClass ? this.selector.substring(1) : this.selector;
    const type =
      (isId && `id="${name}"`) || (isClass && `class="${name}"`) || "";
    const html = `<div ${type} role="presentation" />`;
    this.wrapper.insertAdjacentHTML("beforeend", html);
    return this;
  }

  focusFlow(self = this) {
    return function (event) {
      if (!self.node) {
        self.mountNode();
        self.node = self.wrapper.querySelector(self.selector);
      }
      const eventType = event.type;
      const flowStyle = self.node.style;
      const target = event.target;
      const click = eventType === "click";
      const query = new Query();
      const match = query.allFocusableNodes().includes(target);
      const tabPress = eventType === "keyup" && event.which === self.actionKey;
      const formField = options.inputNodes.includes(target.localName);
      const windowMoved = ["resize", "scroll"].includes(eventType);
      if (windowMoved || (click && !match)) {
        return Object.assign(flowStyle, { transform: "scale(0.001)" });
      }
      if ((tabPress || click) && match) {
        const inputWrapper = options.form.fieldWrapper;
        const inputFieldParent =
          formField && inputWrapper && inputWrapper.length;
        return inputFieldParent
          ? Object.assign(flowStyle, {
              ...query.activeNodeState(target.closest(inputWrapper)),
              color: getComputedStyle(target).color,
            })
          : Object.assign(flowStyle, query.activeNodeState());
      }
    };
  }
}

const activateOn = options.events.attach;

const tail = new FocusFlow({
  wrapper: options.app,
  selector: options.selector,
  actionKey: activateOn.keys.tab,
});

const emit = new Event({
  add: activateOn.types,
});

document.body.setAttribute("tabindex", "-1");

emit.subscribe(tail.focusFlow());
