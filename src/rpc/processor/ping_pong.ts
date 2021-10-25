export enum PingPongEvent {
    Ping, Pong, Error
}

export class PingPong {
    private pongTimeout?: NodeJS.Timeout;
    private subscriber: (event: PingPongEvent) => void;

    constructor(subscriber: (event: PingPongEvent) => void) {
        this.schedulePing();
        this.subscriber = subscriber;
    }

    private schedulePing() {
        setTimeout(() => {
            this.subscriber(PingPongEvent.Ping);
            this.pongTimeout = setTimeout(() => {
                this.subscriber(PingPongEvent.Error);
            });
        }, 30000);
    }

    onPong() {
        if (this.pongTimeout) {
            clearTimeout(this.pongTimeout);
            this.schedulePing();
        }
    }

    onPing() {
        this.subscriber(PingPongEvent.Pong);
    }
}