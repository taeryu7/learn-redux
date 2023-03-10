// connect 사용하기
// connect 함수 더 깔끔하게 작성하기
// mapStateToProps와 mapDispatchToProps를 따로 선언하지 않고 connect 함수를 사용 할 때 인자 쪽에서 익명함수로 바로 만들어서 사용하면 코드가 더 깔끔해진다.
import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import Todos from '../components/Todos';
import { addTodo, toggleTodo } from '../modules/todos';

function TodosContainer({ todos, addTodo, toggleTodo }) {
  const onCreate = text => addTodo(text);
  const onToggle = useCallback(id => toggleTodo(id), [toggleTodo]); // 최적화를 위해 useCallback 사용

  return <Todos todos={todos} onCreate={onCreate} onToggle={onToggle} />;
}

export default connect(
  state => ({ todos: state.todos }),
  {
    addTodo,
    toggleTodo
  }
)(TodosContainer);


/*
// connect 함수에서는 mapDispatchToProps가 함수가 아니라 아예 객체형태일때에는 bindActionCreators를 대신 호출해준다.
import React from 'react';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease, setDiff } from '../modules/counter';

function CounterContainer({ number, diff, increase, decrease, setDiff }) {
  return (
    <Counter
      // 상태와
      number={number}
      diff={diff}
      // 액션을 디스패치 하는 함수들을 props로 넣어준다.
      onIncrease={increase}
      onDecrease={decrease}
      onSetDiff={setDiff}
    />
  );
}

// mapStateToProps 는 리덕스 스토어의 상태를 조회해서 어떤 것들을 props 로 넣어줄지 정의한다.
// 현재 리덕스 상태를 파라미터로 받아온다.
const mapStateToProps = state => ({
  number: state.counter.number,
  diff: state.counter.diff
});

// mapDispatchToProps가 함수가 아니라 객체면
// bindActionCreators 를 connect 에서 대신 해준다.
const mapDispatchToProps = {
  increase,
  decrease,
  setDiff
};

// connect 함수에는 mapStateToProps, mapDispatchToProps 를 인자로 넣어야한다.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterContainer);

// 위 코드는 다음과 동일하다.
//  const enhance = connect(mapStateToProps, mapDispatchToProps);
//  export defualt enhance(CounterContainer);
*/

/*
// redux 라이브러리에 내장된 bindActionCreators 함수 사용 코드
import React from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease, setDiff } from '../modules/counter';

// 액션 생성함수 이름이 바뀌어서 props 이름도 바뀌었다.
// 예: onIncrease -> increase
function CounterContainer({ number, diff, increase, decrease, setDiff }) {
  return (
    <Counter
      // 상태와
      number={number}
      diff={diff}
      // 액션을 디스패치 하는 함수들을 props로 넣어준다.
      onIncrease={increase}
      onDecrease={decrease}
      onSetDiff={setDiff}
    />
  );
}

// mapStateToProps 는 리덕스 스토어의 상태를 조회해서 어떤 것들을 props 로 넣어줄지 정의한다.
// 현재 리덕스 상태를 파라미터로 받아온다.
const mapStateToProps = state => ({
  number: state.counter.number,
  diff: state.counter.diff
});

// mapDispatchToProps 는 액션을 디스패치하는 함수를 만들어서 props로 넣어준다.
// dispatch 를 파라미터로 받아온다.
const mapDispatchToProps = dispatch =>
  // bindActionCreators 를 사용하면, 자동으로 액션 생성 함수에 dispatch 가 감싸진 상태로 호출 할 수 있다.
  bindActionCreators(
    {
      increase,
      decrease,
      setDiff
    },
    dispatch
  );

// connect 함수에는 mapStateToProps, mapDispatchToProps 를 인자로 넣어야한다.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterContainer);

// 위 코드는 다음과 동일하다.
//  const enhance = connect(mapStateToProps, mapDispatchToProps);
//  export defualt enhance(CounterContainer);
*/

/*
// connect 함수는 리덕스 스토어안에 있는 상태를 props로 넣어줄수도, 액션을 디스패치하는 함수 props로 넣어 줄 수있다.

import React from 'react';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease, setDiff } from '../modules/counter';

function CounterContainer({ number, diff, onIncrease, onDecrease, onSetDiff }) {
  return (
    <Counter
      // 상태와
      number={number}
      diff={diff}
      // 액션을 디스패치 하는 함수들을 props로 넣어준다.
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onSetDiff={onSetDiff}
    />
  );
}

// mapStateToProps 는 리덕스 스토어의 상태를 조회해서 어떤 것들을 props 로 넣어줄지 정의한다.
// 현재 리덕스 상태를 파라미터로 받아온다.
const mapStateToProps = state => ({
  number: state.counter.number,
  diff: state.counter.diff
});

// mapDispatchToProps 는 액션을 디스패치하는 함수를 만들어서 props로 넣어준다.
// dispatch 를 파라미터로 받아온다.
const mapDispatchToProps = dispatch => ({
  onIncrease: () => dispatch(increase()),
  onDecrease: () => dispatch(decrease()),
  onSetDiff: diff => dispatch(setDiff(diff))
});

// connect 함수에는 mapStateToProps, mapDispatchToProps 를 인자로 넣어줘야한다.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterContainer);

//위 코드는 다음과 동일하다.
//const enhance = connect(mapStateToProps, mapDispatchToProps);
//export defualt enhance(CounterContainer);

//mapStateToProps는 컴포넌트에 props로 넣어줄 리덕스 스토어 상태에 관련된 함수고, 
//mapDispatchToProps는 컴포넌트에 props로 넣어줄 액션을 디스패치하는 함수들에 관련된 함수다.
//mapDispatchToProps 는 redux 라이브러리에 내장된 bindActionCreators 라는 함수를 사용하면 와와 같이 리팩토링 할 수 있다.
*/

/*
컨테이너 컴포넌트 만들기
컨테이너 컴포넌트란, 리덕스 스토어의 상태를 조회하거나, 액션을 디스패치 할 수 있는 컴포넌트를 의미gksek.
HTML 태그들을 사용하지 않고 다른 프리젠테이셔널 컴포넌트들을 불러와서 사용한다.


import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease, setDiff } from '../modules/counter';

function CounterContainer() {
  // useSelector는 리덕스 스토어의 상태를 조회하는 Hook이다.
  // state의 값은 store.getState() 함수를 호출했을 때 나타나는 결과물과 동일하다.
  const { number, diff } = useSelector(state => ({
    number: state.counter.number,
    diff: state.counter.diff
  }));

  // useDispatch 는 리덕스 스토어의 dispatch 를 함수에서 사용 할 수 있게 해주는 Hook이다.
  const dispatch = useDispatch();
  // 각 액션들을 디스패치하는 함수들을 만들어야한다.
  const onIncrease = () => dispatch(increase());
  const onDecrease = () => dispatch(decrease());
  const onSetDiff = diff => dispatch(setDiff(diff));

  return (
    <Counter
      // 상태와
      number={number}
      diff={diff}
      // 액션을 디스패치 하는 함수들을 props로 넣어준다.
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onSetDiff={onSetDiff}
    />
  );
}

export default CounterContainer;
*/