abstract class BankAccounts {
  balance: number;

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  abstract withdraw(amount: number): void;
}

class CurrentAccount extends BankAccounts {
  withdraw(amount: number): void {
    const fee = 2; 
    const totalAmount = amount + fee;

    if (this.balance >= totalAmount) {
      this.balance -= totalAmount;
    } else {
      console.log("Insufficient balance.");
    }
  }
}

class SavingsAccount extends BankAccounts {
  withdraw(amount: number): void {
    if (this.balance >= amount) {
      this.balance -= amount;
    } else {
      console.log("Insufficient balance.");
    }
  }
}


const genericAccount = new BankAccount(1000); // Error vì ko instace từ abstract class, mà phải extends từ nó

const currentAccount = new CurrentAccount(2000);
currentAccount.deposit(500);
currentAccount.withdraw(300); 

const savingsAccount = new SavingsAccount(1500);
savingsAccount.deposit(1100); 
savingsAccount.withdraw(500); 



// Abstract class có thể có 1 phần logic có sẵn
// , và 1 phần logic chưa có sẵn (abstract method) mà các class con phải implement.