//So sánh
function sum(a, b) {
  return a + b;
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3); //tobe là so sánh hard ===
});

test('object assignment', () => {
  const data = { one: 1 };
  data['two'] = 2;
  expect(data).toEqual({ one: 1, two: 2 }); //toEqual là so sánh medium == dùng để so sánh obj,array
});

// toEqual kiểm tra mọi trường của đối tượng hoặc mảng
// kiểm tra tổng của 2 phần tử a và b có trường hợp nào = 0 không ?(nếu không có thì pass)
test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});
//Truthiness
// toBeNull chỉ phù hợp với null
// toBeUndefined chỉ phù hợp với undefined
// toBeDefined trái ngược với toBeUndefined
// toBeTruthy phù hợp với bất cứ điều gì mà một if tuyên bố coi là đúng
// toBeFalsy khớp với bất cứ điều gì mà một if tuyên bố coi là sai
test('null', () => {
  const n = null;
  expect(n).toBeNull(); //là null
  expect(n).toBeDefined(); //được định nghĩa
  expect(n).not.toBeUndefined(); //không phải là Undefined
  expect(n).not.toBeTruthy(); // là Falsy tương ứng if coi là false
  expect(n).toBeFalsy(); // là Falsy if và coi là false
});

test('zero', () => {
  const z = 0;
  expect(z).not.toBeNull(); //không phải là null
  expect(z).toBeDefined(); //được định nghĩa
  expect(z).not.toBeUndefined(); //không phải là Undefined
  expect(z).not.toBeTruthy(); // là Falsy tương ứng if coi là false
  expect(z).toBeFalsy(); // là Falsy if và coi là false
});
//Number
test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3); // lớn hơn
  expect(value).toBeGreaterThanOrEqual(3.5); // lớn hơn hoặc bằng
  expect(value).toBeLessThan(5); //bé hơn
  expect(value).toBeLessThanOrEqual(4.5); //bé hơn hoặc bằng

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4); // ===
  expect(value).toEqual(4); // ==
});
// float(số thực 6 con số sau dấu thập phân) thì dùng toBeCloseTo thay vì toBe và toEqual nếu không muốn gặp lỗi làm tròn
test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  // expect(value).toBe(0.3); (toEqual)          nó sẽ ra 0.30000000000000004
  // expect(value).toEqual(0.3);                nó sẽ ra 0.30000000000000004
  expect(value).toBeCloseTo(0.3); // This works.
});
//Strings
// Bạn có thể kiểm tra các chuỗi so với các regular expressions với toMatch:

test('there is no I in team', () => {
  expect('team').not.toMatch(/I/); // không có 'I' trong chuỗi 'team'
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/); // không có 'stop' trong chuỗi 'Christoph'
});
//Arrays and iterables
// Bạn có thể kiểm tra xem một Arrays hoặc iterables có chứa một mục cụ thể bằng cách sử dụng toContain:
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'beer',
];

test('the shopping list has beer on it', () => {
  expect(shoppingList).toContain('beer'); // trong mảng shoppingList có 'bear'
  expect(new Set(shoppingList)).toContain('beer'); // ???
});

//Exceptions(Ngoại lệ)
// Nếu bạn muốn kiểm tra xem một particular function(hàm cụ thể) có đưa ra lỗi khi được gọi hay không, hãy sử dụng toThrow.
function compileAndroidCode() {
  throw new Error('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(compileAndroidCode).toThrow();
  expect(compileAndroidCode).toThrow(Error);

  // You can also use the exact error message or a regexp
  expect(compileAndroidCode).toThrow('you are using the wrong JDK');
  expect(compileAndroidCode).toThrow(/JDK/);
});
//Bất Đồng Bộ(tạm bỏ qua)
//Setup and Teardown
// Thông thường trong khi viết bài kiểm tra, bạn có một số setup(thiết lập) cần phải xảy ra trước khi run test
// và bạn có một số công việc hoàn thiện cần phải xảy ra sau khi run test. Jest cung cấp các chức năng trợ giúp để xử lý việc này.
// Repeating Setup For Many Tests (Lặp lại thiết lập cho nhiều bài test)
// Nếu bạn có một số công việc bạn cần thực hiện nhiều lần cho nhiều bài kiểm tra, bạn có thể sử dụng beforeEachvà afterEach.
// Ví dụ: giả sử một số thử nghiệm tương tác với cơ sở dữ liệu của các thành phố. 
// Bạn có một phương thức initializeCityDatabase() phải được gọi trước mỗi bài kiểm tra này 
// và một phương thức clearCityDatabase() phải được gọi sau mỗi bài kiểm tra này. 
// Bạn có thể làm điều này với:

// beforeEach(() => {
//   initializeCityDatabase(); //ví dụ
// });

// afterEach(() => {
//   clearCityDatabase(); //ví dụ
// });

// test('city database has Vienna', () => {
//   expect(isCity('Vienna')).toBeTruthy(); //ví dụ
// });

// test('city database has San Juan', () => {
//   expect(isCity('San Juan')).toBeTruthy(); //ví dụ
// });
// beforeEachvà afterEach có thể xử lý mã không đồng bộ theo cùng cách mà các kiểm tra có thể xử lý mã không đồng bộ 
// - chúng có thể lấy donetham số hoặc trả lại lời hứa. 
// Ví dụ: nếu initializeCityDatabase() trả lại một lời hứa đã được giải quyết khi cơ sở dữ liệu được khởi tạo, chúng tôi muốn trả lại lời hứa đó:

// beforeEach(() => {
//   return initializeCityDatabase(); //ví dụ
// });
//Cài đặt một lần
// Trong một số trường hợp, bạn chỉ cần thực hiện thiết lập một lần, khi bắt đầu tập tin. 
// Điều này có thể đặc biệt khó chịu khi thiết lập không đồng bộ, vì vậy bạn không thể thực hiện nội tuyến. 
// Jest cung cấp beforeAllvà afterAllđể xử lý tình huống này.

// Ví dụ: nếu cả hai initializeCityDatabasevà clearCityDatabasetrả lại lời hứa và cơ sở dữ liệu thành phố có thể được sử dụng lại giữa các lần kiểm tra, 
// chúng tôi có thể thay đổi mã kiểm tra thành:
// beforeAll(() => {
//   return initializeCityDatabase(); //ví dụ
// });

// afterAll(() => {
//   return clearCityDatabase(); //ví dụ
// });

// test('city database has Vienna', () => {
//   expect(isCity('Vienna')).toBeTruthy(); //ví dụ
// });

// test('city database has San Juan', () => {
//   expect(isCity('San Juan')).toBeTruthy(); //ví dụ
// });
// Phạm vi
// Theo mặc định, các khối before và after áp dụng cho mọi thử nghiệm trong một tệp. 
// Bạn cũng có thể nhóm các bài test với nhau bằng cách sử dụng một describe khối. 
// Khi chúng ở trong một describe khối, khối before và after chỉ áp dụng cho các thử nghiệm trong describek hối đó .

// Ví dụ: giả sử chúng ta không chỉ có cơ sở dữ liệu thành phố mà còn có cơ sở dữ liệu thực phẩm. 
// Chúng tôi có thể thực hiện các thiết lập khác nhau cho các thử nghiệm khác nhau:
// Áp dụng cho tất cả các bài kiểm tra trong tập tin này
// beforeEach(() => {
//   return initializeCityDatabase();
// });

// test('city database has Vienna', () => {
//   expect(isCity('Vienna')).toBeTruthy();
// });

// test('city database has San Juan', () => {
//   expect(isCity('San Juan')).toBeTruthy();
// });

// describe('matching cities to foods', () => {
//   // Applies only to tests in this describe block
//   beforeEach(() => {
//     return initializeFoodDatabase();
//   });

//   test('Vienna <3 sausage', () => {
//     expect(isValidCityFoodPair('Vienna', 'Wiener Schnitzel')).toBe(true);
//   });

//   test('San Juan <3 plantains', () => {
//     expect(isValidCityFoodPair('San Juan', 'Mofongo')).toBe(true);
//   });
// });

// Lưu ý rằng cấp cao nhất beforeEach được thực hiện trước khối beforeEach bên trong describe. 
// Nó có thể giúp minh họa thứ tự thực hiện của tất cả các hook.

// beforeAll(() => console.log('1 - beforeAll'));
// afterAll(() => console.log('1 - afterAll'));
// beforeEach(() => console.log('1 - beforeEach'));
// afterEach(() => console.log('1 - afterEach'));
// test('', () => console.log('1 - test'));
// describe('Scoped / Nested block', () => {
//   beforeAll(() => console.log('2 - beforeAll'));
//   afterAll(() => console.log('2 - afterAll'));
//   beforeEach(() => console.log('2 - beforeEach'));
//   afterEach(() => console.log('2 - afterEach'));
//   test('', () => console.log('2 - test'));
// });

// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll
// Thứ tự thực hiện các khối describe và kiểm tra
// Jest thực thi tất cả các trình xử lý describe trong một tệp thử nghiệm trước khi nó thực hiện bất kỳ thử nghiệm thực tế nào. 
// Đây là một lý do khác để thực hiện thiết lập và phân tích bên trong before*và after*xử lý hơn là bên trong các khối describe. 
// Khi các khối describe đã hoàn tất, theo mặc định, Jest sẽ chạy tất cả các thử nghiệm theo thứ tự mà chúng gặp phải trong giai đoạn thu thập, 
// chờ đợi từng khối kết thúc và được dọn dẹp trước khi tiếp tục.
// Xem xét các tập tin thử nghiệm minh họa sau đây và đầu ra:
// nôm na là chạy describe trước khi chạy test
describe('outer', () => {
  console.log('describe outer-a');

  describe('describe inner 1', () => {
    console.log('describe inner 1');
    test('test 1', () => {
      console.log('test for describe inner 1');
      expect(true).toEqual(true);
    });
  });

  console.log('describe outer-b');

  test('test 1', () => {
    console.log('test for describe outer');
    expect(true).toEqual(true);
  });

  describe('describe inner 2', () => {
    console.log('describe inner 2');
    test('test for describe inner 2', () => {
      console.log('test for describe inner 2');
      expect(false).toEqual(false);
    });
  });

  console.log('describe outer-c');
});

// describe outer-a
// describe inner 1
// describe outer-b
// describe inner 2
// describe outer-c
// test for describe inner 1
// test for describe outer
// test for describe inner 2
//Tư vấn chung
// Nếu thử nghiệm thất bại, 
// một trong những điều đầu tiên cần kiểm tra là thử nghiệm có bị lỗi hay không khi đó là thử nghiệm duy nhất chạy. 
// Để chỉ chạy một thử nghiệm với Jest, tạm thời thay đổi testlệnh đó thành test.only:

// test.only('this will be the only test that runs', () => {  //chỉ có mình cái này chạy vì có test.only
//   expect(true).toBe(false);
// });

// test('this test will not run', () => { //cái này sẽ không chạy khi có 1 cái test nào đó có test.only
//   expect('A').toBe('A');
// });
// Nếu bạn có một bài kiểm tra thường thất bại khi nó chạy như một phần của bộ lớn hơn, 
// nhưng không thất bại khi bạn chạy một mình, 
// thì thật tốt khi có một bài kiểm tra khác can thiệp vào bài kiểm tra này. 
// Bạn thường có thể khắc phục điều này bằng cách xóa một số trạng thái chia sẻ với beforeEach. 
// Nếu bạn không chắc chắn liệu một số trạng thái chia sẻ có bị sửa đổi hay không, bạn cũng có thể thử beforeEachghi nhật ký dữ liệu.
//Sử dụng mock function
// Chúng ta hãy tưởng tượng chúng ta đang thử nghiệm một function thực hiện một function forEach gọi lại cho từng mục trong một mảng được cung cấp.

function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}
// Để kiểm tra chức năng này, chúng ta có thể sử dụng mock function và kiểm tra trạng thái của giả để đảm bảo cuộc gọi lại được gọi như mong đợi.

const mockCallback = jest.fn(x => 42 + x);
forEach([0, 1], mockCallback);

// The mock function is called twice
expect(mockCallback.mock.calls.length).toBe(2);

// The first argument of the first call to the function was 0
expect(mockCallback.mock.calls[0][0]).toBe(0);

// The first argument of the second call to the function was 1
expect(mockCallback.mock.calls[1][0]).toBe(1);

// The return value of the first call to the function was 42
expect(mockCallback.mock.results[0].value).toBe(42);
// Mocking Modules
// Giả sử chúng tôi có một lớp tìm nạp người dùng từ API của chúng tôi. 
// Lớp sử dụng các axios để gọi API sau đó trả về data thuộc tính chứa tất cả người dùng:
// users.js
// import axios from 'axios';

// class Users {
//   static all() {
//     return axios.get('/users.json').then(resp => resp.data);
//   }
// }

// export default Users;
// Bây giờ, để kiểm tra phương pháp này mà không thực sự nhấn API (và do đó tạo ra các thử nghiệm chậm và dễ vỡ), 
// chúng tôi có thể sử dụng jest.mock(...)chức năng để tự động mô phỏng mô-đun axios.

// Khi chúng tôi thử module chúng tôi có thể cung cấp một mockResolvedValue cho .get lợi nhuận mà các dữ liệu chúng tôi muốn thử nghiệm của chúng tôi để khẳng định chống lại. 
// Trên thực tế, chúng tôi đang nói rằng chúng tôi muốn axios.get ('/ users.json') trả về phản hồi giả mạo.// users.test.js
// import axios from 'axios';
// import Users from './users';

// jest.mock('axios');

// test('should fetch users', () => {
//   const users = [{name: 'Bob'}];
//   const resp = {data: users};
//   axios.get.mockResolvedValue(resp);

//   // or you could use the following depending on your use case:
//   // axios.get.mockImplementation(() => Promise.resolve(resp))

//   return Users.all().then(data => expect(data).toEqual(users));
// });