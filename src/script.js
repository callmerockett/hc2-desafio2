let customer_table = document.getElementById('customer-table');
let product_table = document.getElementById('product-table');
let customer_button = document.getElementById('customer-button');
let product_button = document.getElementById('product-button');
let translucid_screen = document.getElementById('translucid-screen');
let customer_form = document.getElementById('customer-form');
let product_form = document.getElementById('product-form');
let cbtn_submit = document.getElementById('c-submit');
let pbtn_submit = document.getElementById('p-submit');
var cid = 1;
var pid = 1;

let change_button = document.getElementById('change-button');


change_button.addEventListener('click', (e) => {
    e.preventDefault();
    toggle(product_button);
    toggle(customer_button);
    toggle(product_table);
    toggle(customer_table);
});

customer_button.addEventListener('click', (e) => {
    e.preventDefault();
    toggle(translucid_screen);
    if (customer_button.classList.contains('hide') == false) {
        toggle(customer_form);
    } 
})

product_button.addEventListener('click', (e) => {
    e.preventDefault();
    toggle(translucid_screen);
    if (product_button.classList.contains('hide') == false) {
        toggle(product_form);
    } 
})

cbtn_submit.addEventListener('click', (e) => {
    let cname = document.getElementById('cname');
    let cemail = document.getElementById('cemail');
    let cphone = document.getElementById('cphone');
    let okay = true;
    okay &= checkField(cname);
    okay &= checkField(cemail);
    okay &= checkField(cphone);
    let err = document.getElementById('err');
    if (okay) {
        let list = JSON.parse(localStorage.getItem('customer-list'));
        hide(err);
        let data = {
            id: cid++,
            name: cname.value,
            email: cemail.value,
            phone: cphone.value
        }
        if (list != null && list.length > 0) {
            const has = list.filter((el) => { return el.email == cemail.value });
            if (has != null && has.length > 0) {
                err.textContent = "Cliente já cadastrado!";
                err.style.color = 'red';
                show(err);
                return;
            }


        }
        if (list == null) {
            list = [data];
        } else {
            list.push(data);
        }

        hide(err);
        localStorage.setItem('customer-list', JSON.stringify(list));
        showTable('customer', 'customer-list');
        trigger('click', translucid_screen);
    }

})

pbtn_submit.addEventListener('click', (e) => {
    let name = document.getElementById('pname');
    let price = document.getElementById('pprice');
    let qtd = document.getElementById('pquantity');
    let okay = true;
    okay &= checkField(name);
    okay &= checkField(price);
    okay &= checkField(qtd);
    if (okay) {
        let list = JSON.parse(localStorage.getItem('product-list'));
        hide(err);
        let data = {
            id: pid++,
            name: name.value,
            price: price.value,
            quantity: qtd.value
        }
        if (list == null) {
            list = [data];
        } else {
            list.push(data);
        }
        localStorage.setItem('product-list', JSON.stringify(list));
        showTable('product', 'product-list');
        trigger('click', translucid_screen);
    }

})


translucid_screen.addEventListener('click', (e) => {
    hide(translucid_screen);
    hide(customer_form);
    clearForm(customer_form);
    hide(product_form);
    clearForm(product_form);
})

// Utilitary functions

const trigger = (ev, element) => {
    element.dispatchEvent(new Event(ev));
}
const toggle = (element) => {
    element.classList.toggle('hide');
};

const hide = (element) => {
    element.classList.add('hide');
}

const show = (element) => {
    element.classList.remove('hide');
}

const clearForm = (form) => {
    let els = document.querySelectorAll(`#${form.id} .form-input`);
    for (let i = 0, el; i < els.length; ++i) {
        el = els[i];
        if (el.nodeName == "INPUT") {
            el.value = "";
        } else if (el.classList.contains('err')) {
            el.textContent = "";
        }
    }
}

const showTable = (table_id = null, source = null) => {
    if (table_id == null) {
        showTable('customer', 'customer-list');
        showTable('product', 'product-list');
        return; 
    }
    let list = JSON.parse(localStorage.getItem(source));
    let tbody = document.querySelector(`#${table_id} tbody`);
    tbody.innerHTML = '';
    if (list != null && list.length > 0) {
        for (let i = 0; i < list.length; ++i) {
            let row = tbody.insertRow();
            if (table_id == 'customer') {
                row.innerHTML =
                    `<td> ${list[i].id}</td>
                    <td>${list[i].name}</td>
                    <td>${list[i].email}</td>
                    <td>${list[i].phone}</td>`;
                cid = list[i].id + 1;
            } else {
                row.innerHTML =
                `<td> ${list[i].id}</td>
                <td>${list[i].name}</td>
                <td>${list[i].price}</td>
                <td>${list[i].quantity}</td>`;
                pid = list[i].id + 1;
            }

        }
    }

}

const checkField = (inputElement) => {
    if (inputElement.value == "" || inputElement.value == null) {
        inputElement.classList.add('invalid-field');
        return false;
    }
    inputElement.classList.remove('invalid-field');
    return true;
}