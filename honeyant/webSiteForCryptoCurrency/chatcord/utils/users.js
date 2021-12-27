const users = [];

// Join user to chat
function userJoin(id, username, room) {
  const user = { id, username, room };

  users.push(user);
  //pop : 배열의 마지막 요소 제거 후 제거 된 요소 반환
  //shift : 배열의 첫 번째 요소 제거후 제거한 요소 반환
  //unshift : 배열의 첫 번째 자리에 새로운 요소 추가후 배열 반환
  //push메서드 : 배열 마지막에 요소 추가 후 배열 반환
  // 즉 위의 코드는 users의 배열 마지막에 user추가

  //splice(start,deletecount,el);
  //splice(수정할 배열요소의 인덱스,삭제할 요소의 개수, 요소제거후 배열의 해당 영역에 추가될 요소)
  //reverse : 배열 순서의 반전
  /*sort : 배열 요소 정렬
  //sort그냥 사용시 맨 앞의 숫자만 비교하여 정렬하기 때문에 20과 125를 비교시 125가 앞에 정령
  //순서대로 정렬하려면 sort(function(a,b){return a-b}) 이런 식으로 해주어야 함
  */

  /*
  map : 배열 내 모든 요소 각각에 주어진 함수를 적용한 결과를 반환
  ex)const arrA = [2,4,6,8];
     const mapA = arrA.map(x=>x+1);
     console.log(mapA) // [3,5,7,9]
  */
  /*
  filter : 배열 내에서 주어진 함수에 해당하는 요소만을 반환
  ex)const words = ['banana','apple','watermelon','pear','cherry','stratberry'];
     const newwords = words.filter(word=>word.length>6);
     console.log(newwords) // ['watermelon, strawberry]
  */
 //[1,2,3].reduce((accumulator,currentvalue)=>accumulator+currentvalue) 
 // 현재 값을 계속 더하여 누적된 값만을 반환
 // 즉 reduce메서드가 반환하는 것은 최종적으로 누적된 값
  return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id);
  //find함수 :  주어진 판별 함수를 만족하는 첫번째 요소의 값을 반환
  // 없으면 undefined반환 
}


// User leaves chat
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}
// 위에서 정의한 함수들을 module.exports를 통해 내보냄
module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
};
