const $ = document.querySelector.bind(document)
const _$ = document.getElementById.bind(document)




function Validator (options) {
    console.log(options)
    let elements = []
    let formElement = $(options.form)

    for (let rule of options.rules) {
        elements.push(formElement.querySelector(rule.selector))
    }

    console.log(elements)

    const form = {
        options: options,

        start() {
            this.handleEvents()
        },
        handleEvents() {
            console.log(this)
            var selectedRules = {

            }
            options.rules.forEach(
                (rule) => {
                    const element = formElement.querySelector(rule.selector)
                    if(Array.isArray(selectedRules[rule.selector])){
                        selectedRules[rule.selector].push(rule.test)
                    }
                    else{
                        selectedRules[rule.selector] = [rule.test]
                    }
                    element.onchange = (e) => {
                        console.log('onChange', e.target.value)
                    }
                    element.onblur = (e) => {
                        console.log('onBlur', e.target.value)
                        var errorMessage
                        for(let _rule of selectedRules[rule.selector]){
                            errorMessage = _rule(e.target.value)
                            if(errorMessage) break;
                        }
                        const parentNode = e.target.parentNode
                        console.log([parentNode])
                        // while(e.target.parentNode){
                        //     if(e.target.parentNode){

                        //     }
                        // }
                        const spanElement = parentNode.querySelector(this.options.errMsg)
                        if(errorMessage !== undefined) {
                            parentNode.classList.add('invalid')
                            spanElement.classList.add('invalid')
                            spanElement.innerText = errorMessage
                        }
                    }
                    element.onfocus = (e) => {
                        const parentNode = e.target.parentNode
                        const spanElement = parentNode.querySelector(this.options.errMsg)
                        parentNode.classList.remove('invalid')
                        spanElement.classList.remove('invalid')
                        spanElement.innerText = null
                    }
                    element.oninput = (e) => {
                        console.log('onInput', e.target.value)
                    }

                }
            )
            
        }
    }

    form.start()

}


Validator.isRequired = (selector, msg) => {
    console.log(selector)
    return {
        selector,
        test: function(value){
            return value ? undefined : msg || 'Please enter full name'
        }
    }
}

Validator.isEmail = (selector, msg) => {
    return {
        selector,
        test: function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            if(regex.test(value) === false) {
                return msg || 'Incorrect format password'
            }
            return undefined
        }
    }
}

Validator.isPassword = (selector, msg, min) => {
    return {
        selector,
        test: function(value){
            return value.length > 6 ? undefined : msg|| `Please enter at least ${min} characters`
        }
    }
}

Validator.isConfirmPassword = (selector, msg, cb) => {
    return {
        selector,
        test: function(value){
            return cb() === value ? undefined : msg|| 'Re-entered password is incorrect'
        }
    }
}



