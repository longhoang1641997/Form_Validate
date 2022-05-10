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
        start() {
            this.handleEvents()
        },
        handleEvents() {
            options.rules.forEach(
                (rule) => {
                    const element = formElement.querySelector(rule.selector)
                    element.onchange = (e) => {
                        console.log('onChange', e.target.value)
                    }
                    element.onblur = (e) => {
                        console.log('onBlur', e.target.value)
                        const msg = rule.test(e.target.value)
                        const parentNode = e.target.parentNode
                        const spanElement = parentNode.querySelector('.form-message')
                        if(msg !== undefined) {
                            parentNode.classList.add('invalid')
                            spanElement.classList.add('invalid')
                            spanElement.innerText = msg
                        }
                    }
                    element.onfocus = (e) => {
                        const parentNode = e.target.parentNode
                        const spanElement = parentNode.querySelector('.form-message')
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


Validator.isRequired = (selector) => {
    console.log(selector)
    return {
        selector,
        test: function(value){
            return value ? undefined : 'Please enter full name'
        }
    }
}

Validator.isEmail = (selector) => {
    return {
        selector,
        test: function(value){
            if(value.length <=0) {
                return 'Please enter a valid email'
            }
            else if(value.length > 0 && value.includes('@') === false) {
                return 'Format email is not correct'
            }
            return undefined
        }
    }
}



