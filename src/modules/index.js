
/*
아까 두가지의 리덕스 모듈을 만들었는데 두개의 리듀서가 있다.
한 프로젝트에 여러개의 리듀서가 있을 때 이를 하나의 리듀서로 합쳐서 사용한다. 합쳐진 리듀서를 루트리듀서라고 부른다.

리듀서를 합치는 작업은 리덕스에 내장되어있는 combineReducers라는 함수를 사용한다
combineReducers → https://redux.js.org/api/combinereducers
*/
import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';

const rootReducer = combineReducers({
  counter,
  todos
});

export default rootReducer;