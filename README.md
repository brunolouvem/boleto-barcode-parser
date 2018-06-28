# Boleto Barcode Parser

Parser de numero de boletos escaneados por leitores de código de barra em
códigos de boletos válidos no formato [febraban](http://www.febraban.org.br).

A biblioteca está seguindo os padrões descritos neste [manual](http://www.febraban.org.br/7Rof7SWg6qmyvwJcFwF7I0aSDf9jyV/sitefebraban/Codbar4-v28052004.pdf)

### Forma de uso

```javascript
var original_number = "23797404300001240200448056168623793601105800";
Bankslip.parse(original_number);
//23790448095616862379336011058009740430000124020
```
