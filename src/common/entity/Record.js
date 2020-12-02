import fa from "element-ui/src/locale/lang/fa";

const RecordType = {
    text: 'text',
    image: 'image'
}

export default class Record {
    constructor(type, content, width, height) {
        this.type = type;
        this.content = content;
        this.createDate = new Date();
        this.star = false;
    }

    /**
     * 创建文字记录
     * @param content
     * @returns {Record}
     */
    static createText(content) {
        return new Record(RecordType.text, content);
    }

    /**
     * 创建图片记录
     * @param content
     * @returns {Record}
     */
    static createImage(content, size) {
        return new Record(RecordType.image, content, size.width, size.height);
    }
}

