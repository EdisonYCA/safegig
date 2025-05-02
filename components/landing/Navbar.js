import { Disclosure, DisclosureButton} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { useActiveAccount } from 'thirdweb/react'
import { client } from '@/library/thirdwebClient'
import {
  prepareContractCall,
  sendTransaction,
  getContract,
  defineChain
} from "thirdweb";
import { useStateContext } from '@/context/StateContext'
import { registerUserFb } from '@/library/db/work'
import { ConnectButtonWrapper } from '../ConnectButtonWrapper'
import { deployContract } from "thirdweb/deploys";
const navigation = [
  { name: 'Dashboard', href: '/dashboard', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Navbar({page}) {
  const account = useActiveAccount();
  const {user, setUser} = useStateContext();

  useEffect(() => {
    if (!account) return;
  
    setUser(account);

    const registerUser = async () => {
      await registerUserFb(account.address);
    };
  
    registerUser();

  }, [account]);

  const deploy = async () => {
    const bytecode = "608060405234801561000f575f80fd5b506040516106bc3803806106bc83398181016040528101906100319190610193565b805f908161003f91906103e7565b50506104b6565b5f604051905090565b5f80fd5b5f80fd5b5f80fd5b5f80fd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b6100a58261005f565b810181811067ffffffffffffffff821117156100c4576100c361006f565b5b80604052505050565b5f6100d6610046565b90506100e2828261009c565b919050565b5f67ffffffffffffffff8211156101015761010061006f565b5b61010a8261005f565b9050602081019050919050565b8281835e5f83830152505050565b5f610137610132846100e7565b6100cd565b9050828152602081018484840111156101535761015261005b565b5b61015e848285610117565b509392505050565b5f82601f83011261017a57610179610057565b5b815161018a848260208601610125565b91505092915050565b5f602082840312156101a8576101a761004f565b5b5f82015167ffffffffffffffff8111156101c5576101c4610053565b5b6101d184828501610166565b91505092915050565b5f81519050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f600282049050600182168061022857607f821691505b60208210810361023b5761023a6101e4565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f6008830261029d7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82610262565b6102a78683610262565b95508019841693508086168417925050509392505050565b5f819050919050565b5f819050919050565b5f6102eb6102e66102e1846102bf565b6102c8565b6102bf565b9050919050565b5f819050919050565b610304836102d1565b610318610310826102f2565b84845461026e565b825550505050565b5f90565b61032c610320565b6103378184846102fb565b505050565b5b8181101561035a5761034f5f82610324565b60018101905061033d565b5050565b601f82111561039f5761037081610241565b61037984610253565b81016020851015610388578190505b61039c61039485610253565b83018261033c565b50505b505050565b5f82821c905092915050565b5f6103bf5f19846008026103a4565b1980831691505092915050565b5f6103d783836103b0565b9150826002028217905092915050565b6103f0826101da565b67ffffffffffffffff8111156104095761040861006f565b5b6104138254610211565b61041e82828561035e565b5f60209050601f83116001811461044f575f841561043d578287015190505b61044785826103cc565b8655506104ae565b601f19841661045d86610241565b5f5b828110156104845784890151825560018201915060208501945060208101905061045f565b868310156104a1578489015161049d601f8916826103b0565b8355505b6001600288020188555050505b505050505050565b6101f9806104c35f395ff3fe608060405234801561000f575f80fd5b5060043610610029575f3560e01c8063e21f37ce1461002d575b5f80fd5b61003561004b565b6040516100429190610146565b60405180910390f35b5f805461005790610193565b80601f016020809104026020016040519081016040528092919081815260200182805461008390610193565b80156100ce5780601f106100a5576101008083540402835291602001916100ce565b820191905f5260205f20905b8154815290600101906020018083116100b157829003601f168201915b505050505081565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f601f19601f8301169050919050565b5f610118826100d6565b61012281856100e0565b93506101328185602086016100f0565b61013b816100fe565b840191505092915050565b5f6020820190508181035f83015261015e818461010e565b905092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f60028204905060018216806101aa57607f821691505b6020821081036101bd576101bc610166565b5b5091905056fea2646970667358221220a16c31c2ad6d49b07bf64be836b4be1f627cb485f4f9a0c78d73e67407777d2164736f6c634300081a0033";
    const abi = [
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_message",
            "type": "string"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [],
        "name": "message",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ];
  
    try {
      const address = await deployContract({
        client: client,
        account: account,
        chain: defineChain(97),
        bytecode: bytecode,
        abi: abi,
        constructorParams: {
          _message: "Hello World",
        }
      });
      console.log(address);
    } catch (error) {
      console.error("Deployment failed:", error);
    }
  };

  const interactWithContract = async () => {
    const contract = getContract({
      client,
      chain: defineChain(97),
      address: "0xe20efb90fe7ce840a97d60efbdedb670b06af0c6",
    });

    const transaction = await prepareContractCall({
      contract,
      method: "function createNewUser()",
      params: [],
    });
    
    try {
      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      });
    } catch (error) {
      const message = error?.message || "";

      if (!message.includes("User already registered")) {
        alert("Transaction failed: " + message);
      } 
    }
}


  return (
    <Disclosure as="nav" className="bg-sky-blue">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-between">
            <div className="flex shrink-0 items-center">
              <a href="/" className="text-2xl font-bold">
                SafeGig
              </a>
            </div>
            {
              page == "dashboard" ? 
              <>
              <div className="flex">
                <ConnectButtonWrapper/>
                <button className="bg-white text-black rounded-md px-3 py-2 text-sm font-medium" onClick={() => deploy()}>Deploy</button>
                <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${user ? user : "Jane"}`}
                      className="size-12 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                      Your Profile
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                      Sign out
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
            </> : account ? <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-white hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                    <button
                      className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      Log Out 
                    </button>
                  </div>
              </div> : null
            }
          </div>
        </div>
      </div>
    </Disclosure>
  )
}