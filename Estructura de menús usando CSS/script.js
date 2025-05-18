document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav .menu a');
    const content = document.getElementById('content');

    const contentData = {
        'inicio': '<h2>Inicio</h2><img src="images/inicio.jpg" alt="Inicio"><p>Bienvenido al Banco Futuro. Aquí encontrarás todo lo que necesitas para manejar tus finanzas de manera eficiente y segura.</p>',
        'quienes_somos': '<h2>Quiénes Somos</h2><img src="images/quienes_somos.jpg" alt="Quiénes Somos"><p>En Banco Futuro, somos un grupo de profesionales dedicados a ofrecer soluciones financieras innovadoras y personalizadas. Nuestro objetivo es ayudarte a alcanzar tus metas financieras con productos y servicios de alta calidad.</p>',
        'valores': '<h2>Valores</h2><img src="images/valores.jpg" alt="Valores"><p>Nuestros valores fundamentales incluyen la integridad, la transparencia, el compromiso y la excelencia. Estos valores guían todas nuestras acciones y decisiones, asegurando que siempre actuemos en el mejor interés de nuestros clientes.</p>',
        'mision': '<h2>Misión</h2><img src="images/mision.jpg" alt="Misión"><p>Nuestra misión es proporcionar servicios financieros de primer nivel que ayuden a nuestros clientes a construir un futuro financiero seguro y próspero. Nos esforzamos por ser un socio de confianza para cada uno de nuestros clientes.</p>',
        'vision': '<h2>Visión</h2><img src="images/vision.jpg" alt="Visión"><p>En Banco Futuro, nuestra visión es ser líderes en el sector financiero, reconocidos por nuestra innovación, nuestra relación cercana con los clientes y nuestro compromiso con la sostenibilidad y el desarrollo económico.</p>',
        'productos': '<h2>Productos</h2><img src="images/productos.jpg" alt="Productos"><p>Descubre nuestros productos financieros diseñados para ti. Ofrecemos una amplia gama de productos, desde cuentas de ahorro hasta tarjetas de crédito y préstamos, todos pensados para ayudarte a alcanzar tus objetivos financieros.</p>',
        'ahorro': '<h2>Cuenta de Ahorro</h2><img src="images/ahorro.jpg" alt="Cuenta de Ahorro"><p>Nuestras cuentas de ahorro ofrecen tasas competitivas y beneficios adicionales para que puedas ahorrar de manera segura y eficiente. ¡Empieza a ahorrar hoy mismo!</p>',
        'tarjetas': '<h2>Tarjetas de Crédito</h2><img src="images/tarjetas.jpg" alt="Tarjetas de Crédito"><p>Explora nuestras tarjetas de crédito con beneficios exclusivos, como recompensas, cashback y más. Elige la tarjeta que mejor se adapte a tus necesidades y disfruta de una mayor libertad financiera.</p>',
        'prestamos': '<h2>Préstamos</h2><img src="images/prestamos.jpg" alt="Préstamos"><p>Obtén los préstamos que necesitas para tus proyectos personales, desde la compra de una casa hasta financiar tu educación. Ofrecemos condiciones flexibles y tasas competitivas.</p>',
        'servicios': '<h2>Servicios</h2><img src="images/servicios.jpg" alt="Servicios"><p>Descubre los servicios que ofrecemos para facilitar tus operaciones bancarias, incluyendo banca en línea, asesoría financiera, y más. Estamos aquí para ayudarte en cada paso de tu viaje financiero.</p>',
        'banca': '<h2>Banca en Línea</h2><img src="images/banca.jpg" alt="Banca en Línea"><p>Gestiona tus finanzas desde cualquier lugar con nuestra banca en línea. Consulta saldos, realiza transferencias y mucho más con total seguridad y comodidad.</p>',
        'asesoria': '<h2>Asesoría Financiera</h2><img src="images/asesoria.jpg" alt="Asesoría Financiera"><p>Recibe asesoría financiera personalizada para tus necesidades. Nuestros expertos están aquí para ayudarte a tomar decisiones informadas y estratégicas.</p>',
        'contacto': '<h2>Contacto</h2><img src="images/contacto.jpg" alt="Contacto"><p>Ponte en contacto con nuestro equipo de atención al cliente. Estamos aquí para responder a tus preguntas y brindarte el soporte que necesitas.</p>'
    };

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const contentKey = this.getAttribute('data-content');
            content.innerHTML = contentData[contentKey];
        });
    });
});
