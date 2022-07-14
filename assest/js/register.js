function register(selector) {
    var lists = document.querySelectorAll(selector);

    if(lists) {
        for(var list of lists) {}
        if(list) {
            var dkn = document.querySelector('#register');
        }
    }
    
    dkn.addEventListener('click', function() {
        document.querySelector('.layout_account').style.display = 'block';
        document.querySelector('.layout_account').style.background = 'rgba(0, 0, 0, 0.3)';
    });

    document.querySelector('.login-delete').addEventListener('click', function() {
        document.querySelector('.layout_account').style.display = 'none';
        document.querySelector('.layout_account').style.background = 'none';
    });

}

function register2(selector) {
    var lists = document.querySelector(selector);
    if(lists) {
            var dkn = document.querySelector('#register2');
            console.log(dkn)
    }

    dkn.addEventListener('click', function() {
        document.querySelector('.layout_account').style.display = 'block';
        document.querySelector('.layout_account').style.background = 'rgba(0, 0, 0, 0.3)';
    })

    document.querySelector('.login-delete').addEventListener('click', function() {
        document.querySelector('.layout_account').style.display = 'none';
        document.querySelector('.layout_account').style.background = 'none';
    });
}