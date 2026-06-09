/* COFFEEHOUSE, native, on-brand Information Architecture + card-sort boards
   (replaces the flat screenshot exports). Data transcribed from the originals. */

const IA_DATA = {
  root: 'CoffeeHouse',
  branches: [
    ['User Onboarding', ['Login', 'Logout', 'Create Account', 'Reset Password']],
    ['Ordering', ['Order Coffee for Pickup', 'View Order History', 'Search for Coffee', 'Track Order Status']],
    ['Features', ['Add to Favorites', 'Check Coffee Shop Hours', 'View Local Coffee Shops', 'Browse Coffee Selection']],
    ['Cart', ['View Cart', 'Add Coffee to Cart', 'Edit Cart', 'Checkout']],
    ['Index', ['View Coffee Details', 'Refer a Friend for Discount', 'View FAQs', 'Change Account Settings']],
  ],
};

const SORT_CLOSED = [
  ['Onboarding', ['Login', 'Logout', 'Create Account', 'Reset Password']],
  ['Features', ['Add to favs', 'Check Coffee Shop Hours', 'View Local Coffee Shops', 'Browse Coffee Selection']],
  ['Ordering', ['Order Coffee for Pickup', 'View Order History', 'Search for Coffee', 'Track Order Status']],
  ['Cart', ['View Cart', 'Add Coffee to Cart', 'Edit Cart', 'Checkout']],
  ['Index', ['View Coffee Details', 'View FAQs', 'Change Account Settings', 'Refer a Friend for Discount']],
];

const SORT_OPEN = [
  ['Ordering Process', ['Browse Coffee Selection', 'Search for Coffee', 'Checkout', 'Edit Cart', 'Track Order Status', 'Add Coffee to Cart', 'View Cart', 'View Coffee Details']],
  ['Profile', ['View Order History', 'Change Account Settings', 'Reset Password']],
  ['Onboarding', ['Login', 'Logout', 'Create Account']],
  ['Features', ['Add to favs', 'Refer a Friend for Discount', 'Check Coffee Shop Hours', 'View Delivery Tracking', 'View Local Coffee Shops', 'View FAQs', 'Order Coffee for Pickup', 'Order Coffee for Delivery']],
];

const IAX_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

function SortBoard({ groups, variant = 'open' }) {
  return (
    <div className={`iax-board iax-board--${variant}`}>
      {groups.map(([name, items], gi) => (
        <div className="iax-col" key={name} style={{ '--ci': gi }}>
          <div className="iax-col__head">
            <span className="iax-col__idx pixel">{IAX_LETTERS[gi]}</span>
            <span className="iax-col__name">{name}</span>
            <span className="iax-col__n mono">{String(items.length).padStart(2, '0')}</span>
          </div>
          <div className="iax-col__items">
            {items.map((it) => <span className="iax-chip" key={it}>{it}</span>)}
          </div>
        </div>
      ))}
    </div>
  );
}

function IATree() {
  const { root, branches } = IA_DATA;
  return (
    <div className="iax-tree">
      <div className="iax-tree__root"><span className="iax-tree__rootlabel">{root}</span></div>
      <div className="iax-branches">
        {branches.map(([name, leaves], i) => (
          <div className="iax-branch" key={name} style={{ '--bi': i }}>
            <div className="iax-branch__node"><span>{name}</span></div>
            <div className="iax-branch__leaves">
              {leaves.map((l) => <div className="iax-leaf" key={l}>{l}</div>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { IATree, SortBoard, SORT_OPEN, SORT_CLOSED, IA_DATA });
