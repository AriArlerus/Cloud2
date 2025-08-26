document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.product').forEach(button => {
        button.addEventListener('click', (event) => {
            window.location.href ='/navigation/product-list';
        });
    });
});