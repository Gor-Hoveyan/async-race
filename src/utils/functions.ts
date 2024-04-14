export function generateCar(): {name: string, color: string} {
    const brands = ["Audi", "BMW", "Mercedes-Benz", "Toyota", "Honda", "Ford", "Chevrolet", "Volkswagen"];
    const models = ["A3", "A4", "Q5", "3 Series", "5 Series", "X3", "C-Class", "E-Class", "GLC", "Corolla", "Camry", "RAV4"];
    const colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "cyan", "magenta", "teal", "lime", "brown"];

    const name = brands[Math.floor(Math.random() * brands.length)] + ' ' + models[Math.floor(Math.random() * models.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];

    return {name, color};
}