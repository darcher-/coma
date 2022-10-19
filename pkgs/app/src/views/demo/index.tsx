import * as React from "react";

import { _copy, _msg, _props } from "./fixtures";

import { Fields } from "./demo";
import { Link } from "react-router-dom";
import { updateRemainsList } from "./helpers";

export function Demo(): React.ReactElement {
  const [state, setState] = React.useState<Fields>({
    fname: { form: "", err: undefined, need: true, msg: "" },
    lname: { form: "", err: undefined, need: false, msg: "" },
    email: { form: "", err: undefined, need: true, msg: "" },
    phone: { form: "", err: undefined, need: false, msg: "" },
    gender: { form: "", err: undefined, need: true, msg: "" },
    over21: { form: undefined, err: undefined, need: true, msg: "" },
    store: { form: undefined, err: undefined, need: true, msg: "" },
    remaining: ["fname", "email", "gender", "over21"],
    focused: { left: "-200px", top: "-200px", width: "0px", height: "0px" },
    tracker: React.useRef(null),
  });

  React.useEffect(() => {
    function hideFocusNode() {
      setState((prev) => ({
        ...prev,
        focused: {
          opacity: "0",
          transform: "scale(.001)",
        },
      }));
    }

    window.addEventListener("scroll", hideFocusNode);

    return () => window.removeEventListener("scroll", hideFocusNode);
  }, []);

  function getFocusedStyles(event: any) {
    const { top, left, width, height } = (
      ["checkbox", "radio", "text", "select-one", "tel", "email"].includes(
        event.target.type,
      )
        ? event.target.parentNode
        : event.target
    ).getBoundingClientRect();

    const { borderRadius = "0", margin = "0" }: CSSStyleDeclaration =
      getComputedStyle(event.target);

    setState((prev) => ({
      ...prev,
      focused: {
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
        borderRadius,
        margin,
        opacity: "1",
        transform: "scale(1)",
      },
    }));
  }

  function updateFieldEntries(event: any) {
    return (name: keyof Fields, form: boolean | string) => {
      const node: HTMLInputElement = event.target;
      const err = !node.validity.valid;
      const msg: string = node.validationMessage;

      setState((prev) => ({
        ...prev,
        [name]: { ...prev[name], form, err, msg },
        remaining: updateRemainsList(err, prev.remaining, name),
      }));
    };
  }

  return (
    <>
      <header className="page-header">
        <nav>
          <Link className="link-return" to="/" onFocus={getFocusedStyles}>
            <svg role="img" focusable={false}>
              <use xlinkHref="#icon-back" />
            </svg>
            <span>Back</span>
          </Link>

          <label
            className="switch input"
            title="toggle with spacebar key while focused on element">
            <input
              className="switch-input sr-only"
              type="checkbox"
              onFocus={getFocusedStyles}
              checked={true}
              disabled
            />
            <span className="switch-label">
              <span className="switch-state-off">Disable</span>
              <span className="switch-state-on">Enable </span>
            </span>
            <span className="switch-toggle"></span>
          </label>
        </nav>

        <h1>
          <span>Coma</span> <small>Focus. Follow.</small>
        </h1>
      </header>

      <section className="page-content">
        <h2 className="sr-only">User Form</h2>

        <form noValidate autoComplete="off">
          <fieldset className="fieldset">
            <legend className="sr-only">
              Complete the form ensuring you fill out all required fields.
            </legend>

            <header className="form-header">
              <h3>Complete the form below</h3>
              <p className="sample-message">
                This is a paragraph that has a{" "}
                <a
                  href="#"
                  className="link"
                  title="An anchor title"
                  onFocus={getFocusedStyles}>
                  Link
                </a>{" "}
                within it to demonstrate the tab state between a variety of
                focusable elements.
              </p>
            </header>

            <div className="form-fields">
              <label
                className="input"
                htmlFor="fname"
                aria-describedby="fname-label">
                <span id="fname-label" className="input-label">
                  <span>First Name</span>{" "}
                  <abbr className="input-required" title="required">
                    *
                  </abbr>
                </span>

                <input
                  id="fname"
                  type="text"
                  className="input-field"
                  placeholder="e.g John"
                  aria-invalid={state.fname.err}
                  aria-describedby="fname-msg"
                  value={`${state.fname.form}`}
                  minLength={2}
                  maxLength={50}
                  onFocus={getFocusedStyles}
                  onChange={(event) =>
                    updateFieldEntries(event)(
                      "fname",
                      (event.target as HTMLInputElement).value,
                    )
                  }
                  required={state.fname.need}
                />

                <div id="fname-msg" className="input-msg">
                  {state.fname.err == true ? (
                    <>
                      <svg
                        className="msg-icon"
                        width="18"
                        height="18"
                        role="img"
                        focusable={false}>
                        <use xlinkHref="#icon-alert" />
                      </svg>
                      <p>{state.fname.msg}</p>
                    </>
                  ) : null}
                </div>
              </label>

              <label
                className="input"
                htmlFor="lname"
                aria-describedby="lname-label">
                <span id="lname-label" className="input-label">
                  <span>Last Name</span>
                </span>

                <input
                  id="lname"
                  type="text"
                  className="input-field"
                  placeholder="e.g Doe"
                  aria-invalid={state.lname.err}
                  value={`${state.lname.form}`}
                  aria-describedby="lname-msg"
                  minLength={1}
                  maxLength={75}
                  onFocus={getFocusedStyles}
                  onChange={(event) =>
                    updateFieldEntries(event)(
                      "lname",
                      (event.target as HTMLInputElement).value,
                    )
                  }
                  required={state.lname.need}
                />

                <div id="lname-msg" className="input-msg">
                  {state.lname.err == true ? (
                    <>
                      <svg
                        className="msg-icon"
                        width="18"
                        height="18"
                        role="img"
                        focusable={false}>
                        <use xlinkHref="#icon-alert" />
                      </svg>
                      <p>{state.lname.msg}</p>
                    </>
                  ) : null}
                </div>
              </label>

              <label
                className="input"
                htmlFor="email"
                aria-describedby="email-label">
                <span id="email-label" className="input-label">
                  <span>Email Address</span>{" "}
                  <abbr className="input-required" title="required">
                    *
                  </abbr>
                </span>

                <input
                  id="email"
                  type="email"
                  className="input-field"
                  placeholder="e.g john.doe@mail.co"
                  aria-invalid={state.email.err}
                  value={`${state.email.form}`}
                  aria-describedby="email-msg"
                  minLength={5}
                  maxLength={100}
                  onFocus={getFocusedStyles}
                  onChange={(event) =>
                    updateFieldEntries(event)(
                      "email",
                      (event.target as HTMLInputElement).value,
                    )
                  }
                  required={state.email.need}
                />

                <div id="email-msg" className="input-msg">
                  {state.email.err == true ? (
                    <>
                      <svg
                        className="msg-icon"
                        width="18"
                        height="18"
                        role="img"
                        focusable={false}>
                        <use xlinkHref="#icon-alert" />
                      </svg>
                      <p>{state.email.msg}</p>
                    </>
                  ) : null}
                </div>
              </label>

              <label
                className="input"
                htmlFor="phone"
                aria-describedby="phone-label">
                <span id="phone-label" className="input-label">
                  Phone Number
                </span>

                <input
                  id="phone"
                  type="tel"
                  className="input-field"
                  placeholder="e.g 1-987-012-3456"
                  aria-invalid={state.phone.err}
                  value={`${state.phone.form}`}
                  aria-describedby="phone-msg"
                  minLength={10}
                  maxLength={25}
                  onFocus={getFocusedStyles}
                  onChange={(event) =>
                    updateFieldEntries(event)(
                      "phone",
                      (event.target as HTMLInputElement).value,
                    )
                  }
                  required={state.phone.need}
                />

                <div id="phone-msg" className="input-msg">
                  {state.phone.err == true ? (
                    <>
                      <svg
                        className="msg-icon"
                        width="18"
                        height="18"
                        role="img"
                        focusable={false}>
                        <use xlinkHref="#icon-alert" />
                      </svg>
                      <p>{state.phone.msg}</p>
                    </>
                  ) : null}
                </div>
              </label>

              <div
                className="input"
                role="group"
                aria-invalid={state.over21.err}>
                <span className="input-label">
                  <span>Are you over 21?</span>{" "}
                  <abbr className="input-required" title="required">
                    *
                  </abbr>
                </span>

                <div className="radio column">
                  <label
                    htmlFor="age-over"
                    className="subinput-label"
                    aria-describedby="confirm-label">
                    <input
                      id="age-over"
                      className="radio-field sr-only"
                      type="radio"
                      name="age-question"
                      value="yes"
                      checked={state.over21.form == true}
                      aria-describedby="confirm-msg"
                      onFocus={getFocusedStyles}
                      onChange={(event) =>
                        updateFieldEntries(event)("over21", true)
                      }
                      required={state.over21.need}
                    />
                    <div
                      className="radio-custom-field"
                      role="presentation"></div>

                    <span id="confirm-sublabel">Yes, I can drink!</span>
                  </label>

                  <label
                    htmlFor="age-under"
                    className="subinput-label"
                    aria-describedby="denied-label">
                    <input
                      id="age-under"
                      className="radio-field sr-only"
                      type="radio"
                      name="age-question"
                      value="no"
                      checked={state.over21.form == false}
                      aria-describedby="denied-msg"
                      onFocus={getFocusedStyles}
                      onChange={(event) =>
                        updateFieldEntries(event)("over21", false)
                      }
                      required={state.over21.need}
                    />
                    <div
                      className="radio-custom-field"
                      role="presentation"></div>

                    <span id="denied-sublabel">Nope, not yet.</span>
                  </label>
                </div>

                <div id="over21-msg" className="input-msg">
                  {state.over21.err == true ? (
                    <>
                      <svg
                        className="msg-icon"
                        width="18"
                        height="18"
                        role="img"
                        focusable={false}>
                        <use xlinkHref="#icon-alert" />
                      </svg>
                      <p>{state.over21.msg}</p>
                    </>
                  ) : null}
                </div>
              </div>

              <label
                className="input select"
                htmlFor="gender"
                aria-describedby="gender-label">
                <span id="gender-label" className="select-label">
                  Gender{" "}
                  <abbr className="input-required" title="required">
                    *
                  </abbr>
                </span>

                <select
                  id="gender"
                  className="input-field"
                  aria-invalid={state.gender.err}
                  aria-describedby="gender-msg"
                  onFocus={getFocusedStyles}
                  onChange={(event) =>
                    updateFieldEntries(event)(
                      "gender",
                      ["", "male", "female", "other"][
                        (event.target as HTMLSelectElement).options
                          .selectedIndex
                      ],
                    )
                  }
                  required={state.gender.need}>
                  <option value="">-- Choose an option --</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>

                <div id="gender-msg" className="input-msg">
                  {state.gender.err == true ? (
                    <>
                      <svg
                        className="msg-icon"
                        width="18"
                        height="18"
                        role="img"
                        focusable={false}>
                        <use xlinkHref="#icon-alert" />
                      </svg>
                      <p>{state.gender.msg}</p>
                    </>
                  ) : null}
                </div>
              </label>

              <div
                className="input"
                role="group"
                aria-describedby="store-label">
                <span id="store-label" className="input-label">
                  <span>Is it okay to store your information?</span>
                </span>

                <div className="radio column">
                  <label
                    htmlFor="store"
                    className="subinput-label"
                    aria-describedby="store-sublabel">
                    <input
                      id="store"
                      type="checkbox"
                      className="radio-field sr-only"
                      aria-invalid={state.store.err}
                      aria-describedby="store-msg"
                      checked={state.store.form == true}
                      onFocus={getFocusedStyles}
                      onChange={(event) =>
                        updateFieldEntries(event)(
                          "store",
                          (event.target as HTMLInputElement).checked == true,
                        )
                      }
                      required={state.store.need}
                    />
                    <div
                      className="checkbox-custom-field"
                      role="presentation"></div>

                    <span id="store-sublabel" className="listitem-label">
                      Yes, save my data
                    </span>
                  </label>
                </div>

                <div id="store-msg" className="input-msg">
                  {state.store.err == true ? (
                    <>
                      <svg
                        className="msg-icon"
                        width="18"
                        height="18"
                        role="img"
                        focusable={false}>
                        <use xlinkHref="#icon-alert" />
                      </svg>
                      <p>{state.store.msg}</p>
                    </>
                  ) : null}
                </div>
              </div>

              <div role="group" className="button-group">
                <button
                  aria-describedby={state.remaining.join(",")}
                  disabled={state.remaining.length > 0}
                  type="submit"
                  role="button"
                  className="button"
                  id="form-submit"
                  onFocus={getFocusedStyles}>
                  <div className="button-content">
                    <svg className="button-icon" role="img" focusable={false}>
                      <use xlinkHref="#icon-beaker" />
                    </svg>
                    <span className="button-text">Submit</span>
                  </div>
                </button>
              </div>
            </div>
          </fieldset>
        </form>

        <div
          id="focus-trail"
          ref={state.tracker}
          style={{ ...state.focused }}></div>
      </section>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        focusable={false}
        role="img"
        style={{ display: "none" }}>
        <symbol
          id="icon-alert"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg">
          <g data-name="Warning" id="Warning-3">
            <path
              fill="#c0392b"
              d="M16,2a4,4,0,0,0-4,4V17a4,4,0,0,0,8,0V6A4,4,0,0,0,16,2Z"
            />
            <circle fill="#c0392b" cx="16" cy="26" r="4" />
          </g>
        </symbol>
        <symbol
          id="icon-beaker"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <title>Beaker Icon</title>
          <desc>This is just a placeholder icon for now</desc>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </symbol>
        <symbol
          id="icon-back"
          viewBox="0 0 24 24"
          fill="#e74c3c"
          xmlns="http://www.w3.org/2000/svg">
          <g>
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M8 7v4L2 6l6-5v4h5a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H8z" />
          </g>
        </symbol>
      </svg>
    </>
  );
}
