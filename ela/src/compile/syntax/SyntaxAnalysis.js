import { ParseOperator } from './ParseOperator';
import { ParseTransform } from './ParseTransform';
import { ParseField } from './ParseField';
class SyntaxAnalysis {
		static parse(expression) {
			const exceptions = [];
			expression = ParseTransform.parse(expression, exceptions);
			expression = ParseField.parse(expression, exceptions);
			expression = ParseOperator.parse(expression, exceptions);
			return expression;
		}
}

export{SyntaxAnalysis}