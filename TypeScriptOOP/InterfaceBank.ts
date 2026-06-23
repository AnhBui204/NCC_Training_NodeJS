interface BankAccount {
  balance: number;
  deposit(amount: number): void;
  withdraw(amount: number): void;
}

class CurrentAccounts implements BankAccount {
  balance: number = 0;

  overdraftLimit: number = 0;

  deposit(amount: number): void {
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (amount <= this.balance) {
      this.balance -= amount;
    }
  }
}

class SavingsAccounts implements BankAccount {
  balance: number = 0;

  deposit(amount: number): void {
    if(amount > 0){
      this.balance += amount
    }
  }

  withdraw(amount: number): void {
    // ...
  }
}


//Interface như bộ khung, các subclass implement có thể override lại các hàm