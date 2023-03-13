FROM debian:11


RUN apt-get update   && apt-get install -y apache2  libxml2-dev 

# Enable required Apache modules
RUN a2enmod proxy proxy_http proxy_html xml2enc rewrite ssl  

# Copy Apache configuration file to container
RUN rm etc/apache2/sites-enabled/000-default.conf
COPY ./httpd.conf /etc/apache2/sites-enabled/httpd.conf



# Start Apache web server
CMD ["apache2ctl", "-D", "FOREGROUND"]