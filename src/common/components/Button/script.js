import template from './index.hbs';
import hbs from 'handlebars';
import './style.less';

export default class Button {
    constructor(link) {
        this.link = link;
    }

    onClick(e) {
        e.preventDefault();
        alert(this.link);
    }

    render(node) {
        const text = $(node).text();

        $(node).html(hbs.render(template,{text}));

        $('.button').click(this.onClick.bind(this));
    }
}
