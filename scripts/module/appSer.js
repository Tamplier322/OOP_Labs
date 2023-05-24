export function displayData() {
    // Сериализация .json
    const obj1 = { name: "Слава", age: 18 };
    const json1 = JSON.stringify(obj1);
    console.log(json1);

    // Десериализация .json
    const json2 = '{"name":"Слава","age":18}';
    const obj2 = JSON.parse(json2);
    console.log(obj2);

    // Сериализация bin
    const serializedData = serializeToBinary(obj);

    // Десериализация bin
    const deserializedObj = deserializeFromBinary(serializedData);
    console.log(deserializedObj);

}

// Объект - массив зачений int32, для сериализации bin
const obj = new Int32Array([10, 20, 30, 40, 50]);

// Функция сериализации bin
function serializeToBinary(obj) {
    const buffer = new ArrayBuffer(obj.length * 4);
    const view = new Int32Array(buffer);

    for (let i = 0; i < obj.length; i++) {
        view[i] = obj[i];
    }
    const hexString = arrayBufferToHexString(buffer);
    console.log(`[Uint8Contents]: <${hexString}>, byteLength: ${buffer.byteLength}`);
    return buffer;
}

// Функция десериализации bin
function deserializeFromBinary(buffer) {
    const view = new Int32Array(buffer);
    const obj = [];

    for (let i = 0; i < view.length; i++) {
        obj.push(view[i]);
    }

    return obj;
}

// Функция для вывода содердимого буфера в виде шестнадцатеричного массива
function arrayBufferToHexString(buffer) {
    const view = new Uint8Array(buffer);
    const hexArray = Array.from(view, byte => byte.toString(16).padStart(2, '0'));
    return hexArray.join(' ');
}

displayData()