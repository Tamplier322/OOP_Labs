export class Serializer {

    static displayData() {
        // Сериализация .json
        const obj1 = { name: "Слава", age: 18 };
        const json1 = JSON.stringify(obj1);
        console.log(json1);

        // Десериализация .json
        const json2 = '{"name":"Слава","age":18}';
        const obj2 = JSON.parse(json2);
        console.log(obj2);

        // Сериализация bin
        const buffer = new ArrayBuffer(obj.length * 4);
        const view = new Int32Array(buffer);

        for (let i = 0; i < obj.length; i++) {
            view[i] = obj[i];
        }
        const view1 = new Uint8Array(buffer);
        const hexArray = Array.from(view1, byte => byte.toString(16).padStart(2, '0'));
        console.log(`[Uint8Contents]: <${hexArray}>, byteLength: ${buffer.byteLength}`);

        // Десериализация bin
        const view2 = new Int32Array(buffer);
        const obj5 = [];

        for (let i = 0; i < view2.length; i++) {
            obj5.push(view[i]);
        }
        console.log(obj5)
    }
}
// Объект - массив зачений int32, для сериализации bin
const obj = new Int32Array([10, 20, 30, 40, 50]);