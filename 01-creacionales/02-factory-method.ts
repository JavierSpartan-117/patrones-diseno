/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 *
 */

import { COLORS } from "../helpers/colors.ts";

interface Hamburguer {
    prepare(): void;
}

class ChickenHamburger implements Hamburguer {
    prepare(): void {
        console.log('Preparando una hamburguesa de %cpollo', COLORS.yellow );
    }

}

class BeefHamburger implements Hamburguer {
    prepare(): void {
        console.log('Preparando una hamburguesa de %ccarne', COLORS.brown);
    }

}

class BeanHamburger implements Hamburguer {
    prepare(): void {
        console.log('Preparando una hamburguesa de %cfrijol', COLORS.green);
    }

}

abstract class Restaurant {
    abstract createHamburger(): Hamburguer;

    orderHamburger():void {
        const hamburger = this.createHamburger();
        hamburger.prepare();
    }
}

class ChickenRestaurant extends Restaurant {
    createHamburger(): Hamburguer {
        return new ChickenHamburger()
    }
}

class BeefRestaurant extends Restaurant {
    createHamburger(): Hamburguer {
        return new BeefHamburger()
    }
}

class BeanRestaurant extends Restaurant {
    createHamburger(): Hamburguer {
        return new BeanHamburger()
    }
}

function main() {
    let restaurant: Restaurant;

    const burgerType = prompt('¿Que tipo de hamburguesa quieres? (chicken/beef/bean)')

    switch(burgerType) {
        case 'chicken':
            restaurant = new ChickenRestaurant();
            break;

        case 'beef':
            restaurant = new BeefRestaurant();
            break;

        case 'bean':
            restaurant = new BeanRestaurant();
            break;

        default:
            throw new console.error('Opcion no valida');
    }

    restaurant.orderHamburger();
}

main();
