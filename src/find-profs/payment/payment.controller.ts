import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';

@Controller('payment')
export class PaymentController {

  private stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  private uuid = require('uuid/v4');

  constructor() {
  }

  @Post('pay_with_card')
  async payWithCard(@Body() body, @Res() res: Response): Promise<any> {
    const { product, token } = body;
    console.log(`Product: ${product}`);
    console.log(`Price: ${product.price}`);
    const idempontencyKey = this.uuid();

    return this.stripe.customers.create({
      email: token.email,
      source: token.id
    }).then( customer => {
      this.stripe.charges.create({
        amount: product.price * 100,
        currency: 'usd',
        customer: customer.id,
        receipt_email: token.email,
        description: product.name,
        shipping: {
          name: token.card.name,
          address: {
            country: token.card.address_country
          }
        }
      }, {idempontencyKey})
    })
      .then( result => res.status(HttpStatus.OK) )
      .catch(error => res.status(HttpStatus.BAD_REQUEST));
  }

}
