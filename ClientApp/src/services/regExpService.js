export const regExpService = function () {
    
    this.stringify = (items) => {
        this.string = JSON.stringify(items);
        return this;
    };
    this.objectify = () => {
        this.items = JSON.parse(this.string);
        return this;
    }
    this.removeSystem = () => {
        this.string = this.string.replace(/System\./g, '');
        return this;
    };
    this.removeCommon = () => {
        this.string = this.string.replace(/Microsoft.VSTS.Common\./g, '');
        return this;
    }
    this.removeKanban = () => {
        this.string = this.string.replace(/Kanban-\w+\./g, '');
        return this;
    };
    this.removeAwKanban = () => {
        this.string = this.string.replace(/AW-Kanban\./g, '');
        return this;
    };
    this.removeCustom = () => {
        this.string = this.string.replace(/Custom\./g, '');
        return this;
    };
    this.removeWef = () => {
        this.string = this.string.replace(/(\WWEF_\w+\.Column(\.Done)?\W:)(false|true|\W\w+\W|\W\w+( )\w+( )\w+\W),/g, '');
        return this;
    }   
}