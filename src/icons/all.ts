import * as iconsModule from './'
// делаем заморозку объекта, чтобы мы не могли напутать написание его свойств
export const icons = Object.freeze({ ...iconsModule })
