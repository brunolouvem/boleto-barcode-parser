/**
DV calc:

2 3 7 9 0 4 4 8 0
2 1 2 1 2 1 2 1 2
-----------------
4 3 14 9 0 4 8 8 0

4 + 3 + 1 + 4 + 9 + 4 + 8 + 8 = 41

41%10 = 1

10 - 1 = 9

sequence: 237904480
sequence + DV: 237904480 9

full bankslip example:
unprocessed
23797404300001240200448056168623793601105800

processed
23790448095616862379336011058009740430000124020

 * Created by bruno.
 */
var Bankslip = (function(window, document) {
    'use strict';

    // Return a block by string
    var block = function(string, start, end) {
        return string.slice(start, end);
    }

    var general_dv = function(bankslip) {
        return block(bankslip, 4, 5);
    }

    var currency_info = function(bankslip) {
        return block(bankslip, 3, 4);
    }

    var bank_info = function(bankslip) {
        return block(bankslip, 0, 3);
    }

    var duedate_factor = function(bankslip) {
        return block(bankslip, 5, 9);
    }

    var amount = function(bankslip) {
        return block(bankslip, 9, 19);
    }

    var bankslip_segment_1 = function(bankslip) {
        return append_dv_block([
            bank_info(bankslip),
            currency_info(bankslip),
            block(bankslip, 19, 24)
        ]);
    }

    var bankslip_segment_2 = function(bankslip) {
        return append_dv_block([
            block(bankslip, 24, 34)
        ]);
    }

    var bankslip_segment_3 = function(bankslip) {
        return append_dv_block([
            block(bankslip, 34, 44)
        ]);
    }

    var bankslip_segment_4 = function(bankslip) {
        return [
            duedate_factor(bankslip),
            amount(bankslip)
        ].join("");
    }

    // Receive a string array and return a string appended DV
    var append_dv_block = function(array_data) {
        var str = array_data.join("");
        return str.concat(get_sum_from_sequence(str));
    }

    // Generate multiply sequence eg.: [2, 1, 2]
    function multiply_sequence(len) {
        var bars = new Array();
        var start_dig = 2;

        for (var i = 0; i < len; i++) {
            bars.push(start_dig);
            if (start_dig === 1) {
                start_dig++;
            }else{
                start_dig--;
            }
        }
        return bars;
    }

    // Generate digit verificator
    function get_sum_from_sequence(seq) {
        var bar = [];
        var mseq = multiply_sequence(seq.length).reverse();

        mseq.forEach(function(value, index){
            bar.push(value * parseInt(seq[index]));
        });

        var string_bar = bar.join("");
        var bar_value = 0;
        bar = Array.from(string_bar);

        var sum = bar.forEach(function(value){
            bar_value += parseInt(value);
        });

        return (10 - (bar_value % 10));
    }

    var bankslip = function(bankslip_number) {
        return [
            bankslip_segment_1(bankslip_number),
            bankslip_segment_2(bankslip_number),
            bankslip_segment_3(bankslip_number),
            general_dv(bankslip_number),
            bankslip_segment_4(bankslip_number)
        ].join("");
    }

    //Public API
    return {
        parse : bankslip
    }

}(window, document));
