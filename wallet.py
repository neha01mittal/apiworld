from coinbase.wallet.client import Client


def createClient():
    client = Client('uKHYQNdiAQswOl9e',
    '0mzcwBFq5Hxrxiv7Rci31GYJFVMF9PK6',
    api_version='2017-09-23')

    accounts = client.get_accounts()
    for account in accounts.data:
        balance = account.balance
        print "%s: %s %s" % (account.name, account.id, balance.amount)
        print account.get_transactions()
    return client

def createNewWallet(client):
    account = client.create_account(name="Sun Wallet")
    balance = account.balance
    print "%s: %s %s" % (account.name, balance.amount, balance.currency)
    address = account.create_address()
    print address, 'SUN ADDRESS'
    return account

def sendBitcoin(toAccount):
    # Generate a new bitcoin address for your primary account:
    primary_account = client.get_primary_account()
    print "%s: %s %s" % (primary_account.name, primary_account.balance.amount, primary_account.balance.currency)
    address = toAccount.create_address()  # You created this account in the previous step

    # Send coins to the new account from your primary account:
    primary_account.send_money(to=address.address, amount='0.00000027000', currency='BTC', description='For being awesome!')
    print primary_account.get_transactions()[-1]
    # After some time, the transaction should complete and your balance should update
    primary_account.refresh()
    balance = primary_account.balance
    print "%s: %s %s" % (primary_account.name, balance.amount, balance.currency)

if __name__ == "__main__":
    client = createClient()
    #newAccount = createNewWallet(client)
    #accounts = client.get_accounts()
    neha = client.get_account('dac38939-bcd6-5822-8740-5bbb59826a22')
    #'c57557f7-6e7d-53fd-87cf-cce3d87c94dd')
    print('NEHA ACCOUNT', neha)
    neha.send_money(to='1BocM7jxPPhFXj91Egud32MQ8bGNo94WnB', amount='0.00010000', currency='BTC', description='For being awesome!')
    #newAccount = createNewWallet(client)
    #sendBitcoin(newAccount)