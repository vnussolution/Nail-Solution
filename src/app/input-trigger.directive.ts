import { Directive, OnInit, Inject, ElementRef, Input } from '@angular/core'

//import { JQ_TOKEN } from './toastr.service'

declare let $: any;
@Directive({
    selector: `[input-trigger]`
})
export class InputTriggerDirective implements OnInit {

    @Input('input-trigger') inputId: string;
    private el: HTMLElement;
    $ = window['$'];

    constructor(ref: ElementRef) {
        this.el = ref.nativeElement;
    }

    ngOnInit() {
        this.el.addEventListener('click', e => {
            this.$(`#mylabel`).html(this.inputId);
            // jQuery('#simple-modal');
            // $('#simple-modal').modal({});
        });
    }
}


