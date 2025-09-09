from app.bankaccount import BankAccount
import pytest

def test_default_balance():
    bank_account = BankAccount()
    assert bank_account.balance == 0

def test_deposite_balance():
    bank_account = BankAccount()
    bank_account.deposite(100)
    assert bank_account.balance == 100   

def test_withdraw_balance():
    bank_account = BankAccount(100)
    bank_account.withdraw(50)
    assert bank_account.balance == 50   

def test_interest_on_balance():
    bank_account = BankAccount(100)
    bank_account.collect_interest()
    assert round(bank_account.balance,5) == 110   


