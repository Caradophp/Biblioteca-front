import M from "materialize-css";

export default class Toast {

    static success(message) {
        M.toast({ html: `<i class="material-icons left">check_circle</i> ${message}`, classes: 'green' });
    }

    static error(message) {
        M.toast({ html: `<i class="material-icons left">error</i> ${message}`, classes: 'red' });
    }

    static info(message) {
        M.toast({ html: `<i class="material-icons left">info</i> ${message}`, classes: 'blue' });
    }

    static warning(message) {
        M.toast({ html: `<i class="material-icons left">warning</i> ${message}`, classes: 'orange' });
    }
}