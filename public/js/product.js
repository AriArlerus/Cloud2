document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.shownow').forEach(button => {
        button.addEventListener('click', (event) => {
            window.location.href ='/navigation/product-list';
        });
    });
});