function validator(formSelector) {

    function getParent(element, selector) {
        while (element.parentElement) {
            if(element.parentElement.matches(selector)) {
                return element.parentElement;
            } else {
                element = element.parentElement;
            }
        }
    }

    var formRules = {};
    var validatorRules = {
        required: function(value) {
            return value ? undefined : 'vui lòng nhập trường này';
        },
        email: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'vui lòng nhập đúng định dạng';
        },
        phone: function(value) {
            var regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            return regex.test(value) ? undefined : 'vui lòng nhập đúng định dạng';
        }
    };

    // lấy ra form element trong DOM theo 'formSelector'
    var formElement = document.querySelector(formSelector);

    // chỉ xử lý khi có element trong DOM
    if(formElement) {
        var inputs = formElement.querySelectorAll('[name][rules]')
        for(var input of inputs) {

            var rules = input.getAttribute('rules').split('|');

            for(var rule of rules) {
                if(Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(validatorRules[rule]);
                } else {
                    formRules[input.name] = [validatorRules[rule]];
                }
            }

            // lắng nghe sự kiện validate
            input.onblur = handleValidate;
            input.oninput = handleClearError;
        }

        // hàm thực hiện validate
        
        function handleValidate(event) {
            var rules = formRules[event.target.name];
            var errorMessage;

            rules.some(function(rule) {
                errorMessage = rule(event.target.value);
                return errorMessage;
            });

            // nếu có lỗi thì hiển thị message lỗi ra UI
            if(errorMessage) {
                var formGroup = getParent(event.target, '.form-group');

                if(formGroup) {
                    event.target.classList.add('is-invalid')
                    formGroup.classList.add('invalid');
                    var formMessage = formGroup.querySelector('.form-message');
                    if(formMessage) {
                        formMessage.innerText = errorMessage;
                    }
                }
            }
            return !errorMessage
        }
        function handleClearError(event) {
            var formGroup = getParent(event.target, '.form-group');
            if(formGroup.classList.contains('invalid') && event.target.classList.contains('is-invalid')) {
                formGroup.classList.remove('invalid');
                event.target.classList.remove('is-invalid');

                var formMessage = formGroup.querySelector('.form-message');
                    if(formMessage) {
                        formMessage.innerText = '';
                    }
            }
        }
    }

    formElement.onsubmit = function(event) {
        event.preventDefault();
        var inputs = formElement.querySelectorAll('[name][rules]');
        var isValid = true;

        for(var input of inputs) {
            console.log(input)

            if(!handleValidate({target: input})) {
                isValid = false;
            }
        }
        if(isValid) {
            formElement.submit();
        }
    }
    // console.log(formRules);
}
