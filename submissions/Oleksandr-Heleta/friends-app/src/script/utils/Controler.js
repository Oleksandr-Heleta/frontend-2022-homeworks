import FormModel from "../models/FormModel";
import CardsModel from "../models/CardsModel";
import {
    ABC_Ascending,
    BOTH
} from "../utils/utils";

class Controller {
    constructor() {
        this.formModel = new FormModel();
        this.cardsModel = new CardsModel();
    }

    getDOMelem(event, selector) {
        return event.target.closest(selector);
    }

    resetForm(event) {
        const { findName, minAge, maxAge, gender, sort } = this.getDOMelem(event, '.form');
        findName.value = '';
        minAge.value = '';
        maxAge.value = '';
        gender.value = BOTH;
        sort.value = ABC_Ascending;
        this.setRequirementsFromForm(event);
    }

    setRequirementsFromForm(event) {
        const { findName, minAge, maxAge, gender, sort } = this.getDOMelem(event, '.form');
        const formRequirements = {
            name: findName.value.trim(),
            minAge: +minAge.value || undefined,
            maxAge: +maxAge.value || undefined,
            gender: gender.value,
            sort: sort.value
        };

        this.cardsModel.findAndSort(formRequirements);
    }

    onOpenMobileMenu() {
        const menuBtn = document.querySelector('.mob_menu');
        document.body.classList.toggle('lock');
        const aside = document.querySelector('.aside');
        aside.classList.toggle('active');
        menuBtn.classList.toggle('active');
    }

    onSubmitForm(event) {
        event.preventDefault();
        this.setRequirementsFromForm(event);
    }

    onClick(event) {
        if (this.getDOMelem(event, '.form-checkbox')) {
            this.onCheck(event);
        }
        if (this.getDOMelem(event, '.form-button')) {
            switch (this.getDOMelem(event, '.form-button').id) {
                case 'submit':
                    if (this.getDOMelem(event, '.active')) {
                        this.onOpenMobileMenu();
                    }
                    break;
                case 'reset':
                    this.resetForm(event);
                    break;
                default:
                    break;
            }
        }
    }

    onCheck(event) {
        const checkBox = this.getDOMelem(event, '.form-checkbox');
        this.setRequirementsFromForm(event);
        checkBox.checked = true;
    }

    onInput(event) {
        const input = this.getDOMelem(event, '.form-input');
        if (input) {
            this.setRequirementsFromForm(event);

        }
    }

    onLoad() {
        this.cardsModel.createUserList();
    }

    onPage({ target: button }) {
        this.cardsModel.switchPage(button.id);
    }


};

export default Controller

