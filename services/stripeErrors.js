
exports.errorBy = function(code){
	
	switch(code){
	    case "authentication_required": 
	    	return { error: true, code: 404, type: 'CARD_AUTHENTICATION_REQUIRED', message: 'Card authentication required', intent: err.raw.payment_intent };
	    	break;
	    case "card_not_supported": 
	    	return { error: true, code: 404, type: 'CARD_NOT_SUPPORTED', message: 'Card not supported' };
	    	break;
	    case "card_velocity_exceeded": 
	    	return { error: true, code: 404, type: 'BALANCE_CREDIT_EXCEEDED', message: 'Blance credit exceeded' };
	    	break;
	    case "withdrawal_count_limit_exceeded": 
	    	return { error: true, code: 404, type: 'BALANCE_CREDIT_EXCEEDED', message: 'Blance credit exceeded' };
	    	break;
	    case "currency_not_supported": 
	    	return { error: true, code: 404, type: 'CURRENCY_NOT_SUPPORTED', message: 'Currency not supported' };
	    	break;
	    case "duplicate_transaction": 
	    	return { error: true, code: 404, type: 'DUPLICATED_TRANSACTION', message: 'Duplicated transaction' };
	    	break;
	    case "expired_card": 
	    	return { error: true, code: 404, type: 'EXPIRED_CARD', message: 'Expired card' };
	    	break;
	    case "fraudulent": 
	    	return { error: true, code: 404, type: 'FRAUDULENT_PAYMENT', message: 'Fraudulent payment' };
	    	break;
	    case "incorrect_number": 
	    	return { error: true, code: 404, type: 'INCORRECT_CARD_NUMBER', message: 'Incorrect card number' };
	    	break;
	    case "invalid_number": 
	    	return { error: true, code: 404, type: 'INCORRECT_CARD_NUMBER', message: 'Incorrect card number' };
	    	break;
	    case "incorrect_cvc": 
	    	return { error: true, code: 404, type: 'INCORRECT_CVC_NUMBER', message: 'Incorrect cvc number' };
	    	break;
	    case "invalid_cvc": 
	    	return { error: true, code: 404, type: 'INCORRECT_CVC_NUMBER', message: 'Incorrect cvc number' };
	    	break;
	    case "incorrect_pin": 
	    	return { error: true, code: 404, type: 'INCORRECT_PIN_NUMBER', message: 'Incorrect pin number' };
	    	break;
	    case "invalid_pin": 
	    	return { error: true, code: 404, type: 'INCORRECT_PIN_NUMBER', message: 'Incorrect pin number' };
	    	break;
	    case "offline_pin_required": 
	    	return { error: true, code: 404, type: 'INCORRECT_PIN_NUMBER', message: 'Incorrect pin number' };
	    	break;
	    case "online_or_offline_pin_required": 
	    	return { error: true, code: 404, type: 'INCORRECT_PIN_NUMBER', message: 'Incorrect pin number' };
	    	break;
	    case "incorrect_zip": 
	    	return { error: true, code: 404, type: 'INCORRECT_ZIP_NUMBER', message: 'Incorrect zip number' };
	    	break;
	    case "insufficient_funds": 
	    	return { error: true, code: 404, type: 'INSUFFICIENT_FUNDS', message: 'Insufficient funds' };
	    	break;
	    case "invalid_account": 
	    	return { error: true, code: 404, type: 'INVALID_ACCOUNT', message: 'Invalid account' };
	    	break;
	    case "invalid_amount": 
	    	return { error: true, code: 404, type: 'INVALID_AMOUNT_OR_EXCEEDED', message: 'Invalid amount or exceeded' };
	    	break;
	    case "invalid_expiry_year": 
	    	return { error: true, code: 404, type: 'INVALID_EXPIRY_YEAR', message: 'Invalid expiry year' };
	    	break;
	    case "issuer_not_available": 
	    	return { error: true, code: 404, type: 'ISSUER_NOT_AVAILABLE', message: 'Issuer not available' };
	    	break;
	    case "lost_card": 
	    	return { error: true, code: 404, type: 'LOST_CARD', message: 'Lost card' };
	    	break;
	    case "merchant_blacklist": 
	    	return { error: true, code: 404, type: 'MERCHANT_BLACKLIST', message: 'Merchant blacklist' };
	    	break;
	    case "not_permitted": 
	    	return { error: true, code: 404, type: 'NOT_PERMITTED', message: 'Not permitted' };
	    	break;
	    case "pin_try_exceeded": 
	    	return { error: true, code: 404, type: 'PIN_TRY_EXCEEDED', message: 'Pin try exceeded' };
	    	break;
	    case "stolen_card": 
	    	return { error: true, code: 404, type: 'STOLEN_CARD', message: 'Stolen card' };
	    	break;
	    case "try_again_later": 
	    	return { error: true, code: 404, type: 'TRY_AGAIN_LATER', message: 'Try again later' };
	    	break;
	    default: 
	    	return { error: true, code: 404, type: 'CARD_ERROR', message: code };
	    	break;
	}
};