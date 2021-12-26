import DefaultActionType from './DefaultActionType'

export default interface DefaultAction {
    type: DefaultActionType;
    payload: any;
}