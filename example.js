// 这是一个示例JavaScript文件
function greet(name) {
  console.log(`Hello, ${name}!`);
  return `Welcome to Rspress, ${name}`;
}

const users = ['Alice', 'Bob', 'Charlie'];
users.forEach(user => {
  greet(user);
});

export { greet };