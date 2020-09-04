class StudyRoute {
    constructor(element, elo) {
        this.element = element;
        this.elo = elo;
    }

    async getName() {
        const name = await this.element.$('strong');
        return name ? name.innerText : null;
    }

    async getDirectories() {
        
    }
}

module.exports = StudyRoute;