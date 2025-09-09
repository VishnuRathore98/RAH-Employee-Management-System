# Testing classes 

class BankAccount():
    def __init__(self, starting_balance=0):
        self.balance = starting_balance

    def deposite(self, amount):
        self.balance+=amount

    def withdraw(self, amount):
        self.balance-=amount

    def collect_interest(self):
        self.balance*=1.1
