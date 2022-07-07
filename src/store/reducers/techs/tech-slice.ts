import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type tech = {
  text: string;
  photo: string;
  title: string;
}
type techsState = {
  techs: tech[];
}
const initialState: techsState = {
  techs: [
    {
      title: "React",
      text: "библиотека для разработки пользовательских интерфейсов.",
      photo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/640px-React-icon.svg.png",
    },
    {
      title: "Redux",
      text: 'Библиотека для JavaScript с открытым исходным кодом, предназначенная для управления состоянием приложения.',
      photo: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Redux.png',
    },
    {
      title: 'Django',
      photo: 'https://brandlogos.net/wp-content/uploads/2021/11/django-logo.png',
      text: 'Django — свободный фреймворк для веб-приложений на языке Python, использующий шаблон проектирования MVC.'
    }
  ]
}

export const techSlice = createSlice({
  name: 'techs',
  initialState,
  reducers: {

  }
});

export default techSlice.reducer