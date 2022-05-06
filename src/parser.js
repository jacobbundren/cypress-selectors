export default class Parser {

    constructor(vueFiles = []) {
        this.vueComponents = vueFiles;
        this.parsedComponents = [];
    }

    traverseComponents() {
        if (this.vueComponents.length > 0) {
            this.vueComponents.forEach((component) => {
                if (component.componentName && component.componentTemplate) {
                    this.parseAttributes(component);
                } else {
                    throw new Error("Component missing properties to parse")
                }
            })
        } else {
            throw new Error("No components to parse");
        }
    }

    parseAttributes(component) {
        let attrRegex = /data-cy="(.+?)"/g
        let selectors = [];
        let matchedSelectors = component.componentTemplate.match(attrRegex);
        if (matchedSelectors) {
            matchedSelectors.forEach(selector => {
                selectors.push(this.parseAttributeValues(selector));
            })
        }
        if (selectors.length > 0) {
            this.parsedComponents.push({
                componentName: component.componentName,
                selectors: selectors
            });
        }
    }

    parseAttributeValues(attribute) {
        let valRegex = /"(.+?)"/
        return attribute.match(valRegex)[1];
    }
}