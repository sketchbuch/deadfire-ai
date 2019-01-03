// @flow

import * as yup from 'yup';


/**
* Validation scheme for the install path for PoE 2.
* @return object
*/
const installPathSchema = yup.string().trim().required();


export default installPathSchema;