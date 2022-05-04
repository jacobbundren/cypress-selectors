export default class Parser {

    constructor(vueFiles = []) {
        this.vueComponents = vueFiles;
        this.parsedComponents = [];
    }

    traverseComponents() {
        if (this.vueComponents.length > 0) {
            this.vueComponents.forEach((component) => {
                if (component.componentName && component.componentTemplate) {
                    this.parseComponent(component)
                } else {
                    throw new Error("Component missing properties to parse")
                }
            })
        } else {
            throw new Error("No components to parse");
        }
    }

    parseComponent(unparsedComponent) {
        let attrRegex = /data-cy="(.+?)"/gm
        let valRegex = /"(.+)"/
        let parsedComponent = {};
        let matchedSelectors = unparsedComponent.componentTemplate.match(attrRegex)
        if (matchedSelectors) {
            parsedComponent = {
                componentName: unparsedComponent.componentName,
                selectors: []
            };
            matchedSelectors.forEach((selector) => {
                parsedComponent.selectors.push(selector.match(valRegex)[1]);
            })
            this.parsedComponents.push(parsedComponent);
        }
    }



}