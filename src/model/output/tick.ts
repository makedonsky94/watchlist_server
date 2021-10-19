export class Tick {
    symbol: string;
    price?: number;
    description?: string;
    icon?: string;

    private constructor(
        symbol: string, 
        options: {
            description?: string, 
            icon?: string, 
            price?: number
        }
    ) {
        this.symbol = symbol;
        this.description = options.description;
        this.icon = options.icon;
        this.price = options.price;
    }

    static symbolWithMetaData(symbol: string, description: string, icon: string): Tick {
        return new Tick(symbol, { description: description, icon: icon });
    }

    static symbolWithPrice(symbol: string, price: number): Tick {
        return new Tick(symbol, { price: price });
    }
}