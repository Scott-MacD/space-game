const {assign, defineProperties, getOwnPropertyDescriptors} = Object;

const _COMPOSES = Symbol();
const _INITIALIZERS = Symbol();

// export function create(Record, init) {
//     return arguments.length < 2 ? new Record : assign(new Record, init);
// };

function is(Record) {
    return this.constructor.implements(Record);
}

function init(props) {
    this.constructor[_INITIALIZERS].forEach(fn => fn.call(this, props));
    return this;
}

export function define(name, ...args) {
    
    function Record() {}
    const {prototype} = Record;

    const records = [Record];
    const initializers = [];

    prototype.is = is;
    prototype.init = init;

    for (let i = 0, {length} = args; i < length; i++) {
        const curr = args[i];
        let descriptors;

        if (curr.hasOwnProperty("init")) {
            initializers.push(curr.init);
            delete curr.init;
        }

        if (curr.hasOwnProperty(_COMPOSES)) {
            descriptors = getOwnPropertyDescriptors(curr.prototype);
            records.push(...curr[_COMPOSES]);
            initializers.push(...curr[_INITIALIZERS]);
        } else {
            descriptors = getOwnPropertyDescriptors(curr);
        }

        defineProperties(prototype, descriptors);
    }

    defineProperties(prototype, {
        constructor: {
            writable: false,
            value: Record
        }
    });

    Record[_COMPOSES] = Array.from(new Set(records));
    Record[_INITIALIZERS] = Array.from(new Set(initializers));

    return defineProperties(Record, {
        implements: {
            value: record => Record[_COMPOSES].includes(record)
        },
        name: {
            value: name,
            writable: false
        },
        create: {
            value: function(props) {
                const record = new Record;

                if (props) {
                    Object.keys(props).forEach(key => {
                        if (prototype.hasOwnProperty(key)) {
                            record[key] = props[key];
                        }
                    });
                }
                
                return record.init(props);
            }
        }
    });
};