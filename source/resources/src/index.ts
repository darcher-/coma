export interface DataTypes {
  title: string;
  message: string;
  port: number;
}

export const __appdata: DataTypes = {
  title: 'Welcome to Coma',
  message:
    'This is the main page of our application where you can confirm that it is dynamic by clicking the button below.',
  port: 3000,
};

export default __appdata;
