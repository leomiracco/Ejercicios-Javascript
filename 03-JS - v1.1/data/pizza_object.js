export const data = {
  searching: false,
  mainContainer: {},
  pizzaArray: [],
  localStoragePizzaArray: [],
  inputId: {},
  validationErrorMessage: "Solo se admiten números Naturales. Y además, el casillero NO puede quedar vacío.",
  outOfRangeErrorMessage: "El nro. de Id, debe estar comprendido entre",
  searchResult: "El resultado de la búsqueda aparecerá aquí...",
  pizzas: [
    {id: 5, nombre: "Napolitana", ingredientes: ["Queso-Mozzarella", "Jamón", "Tomate", "Orégano"], precio: 700, imgSrc: '../assets/img/napolitana.jpg'},
    {id: 6, nombre: "Pepperoni", ingredientes: ["Queso-Mozzarella", "Pepperoni", "Tomate", "Orégano", "Albahaca"], precio: 650, imgSrc: '../assets/img/pepperoni.webp'},
    {id: 3, nombre: "Palmitos-Jamón", ingredientes: ["Palmitos", "Jamón", "Salsa-Golf", "Salsa-Tomate", "Queso"], precio: 680, imgSrc: '../assets/img/palmitos-jamon.jpg'},
    {id: 4, nombre: "Margarita", ingredientes: ["Queso-Mozzarella", "Pimienta", "Tomate", "Albahaca"], precio: 690, imgSrc: '../assets/img/margarita.jpg'},
    {id: 2, nombre: "Pollo", ingredientes: ["Queso-Mancheco", "Pechuga-Pollo", "Cilantro", "Pimienta", "Cebolla"], precio: 585, imgSrc: '../assets/img/pollo.jpg'},
    {id: 7, nombre: "Jamón-Panceta", ingredientes: ["Queso-Pategrás", "Panceta", "Tomate", "Orégano", "Ajo"], precio: 599, imgSrc: '../assets/img/jamon-panceta.jpg'},
    {id: 1, nombre: "Ananá", ingredientes: ["Queso", "Ananá", "Tomate", "Orégano", "Ajo"], precio: 612, imgSrc: '../assets/img/anana.jpg'}
  ]
};