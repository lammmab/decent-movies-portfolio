class Route {
    name: string;
    resource: (req: Request,res: Response) => void;

    constructor(name: string, resource: (req: Request, res: Response) => void) {
        this.name = name
        this.resource = resource
    }

    call(req: Request, res: Response) {
        this.resource(req,res)
    }
}

module.exports = {
    Route
}