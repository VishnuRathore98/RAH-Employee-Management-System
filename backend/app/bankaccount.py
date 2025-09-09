# Testing classes 

class Insufficiant_balance(Exception):
    pass

class BankAccount():
    def __init__(self, starting_balance=0):
        self.balance = starting_balance

    def deposite(self, amount):
        self.balance+=amount

    def withdraw(self, amount):
        if amount > self.balance:
            raise Insufficiant_balance("Insufficiant balance in account")
        self.balance-=amount

    def collect_interest(self):
        self.balance*=1.1
