class Slider {
    constructor(id, value)
    {
        this.id = id;
        this.defaultValue = value;
        this.value = value;

        this.element = document.getElementById(id);
        this.element.value = value;

        this.text = document.createTextNode(value);
        this.element.after(this.text);
    }
}