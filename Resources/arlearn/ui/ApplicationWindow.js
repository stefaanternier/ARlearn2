(function() {

	var tabGroup = Titanium.UI.createTabGroup({
		id:'tabGroup1'
	});

	SplitViewNav = {};

	ar.ui.createApplicationWindow = function(_args) {

		ar.ui.initTabGroup();

		var tabGroupWindow = Ti.UI.createWindow({
			title: 'Settings'
		});
		tabGroupWindow.add(tabGroup);

		SplitViewNav.masterWindow = tabGroupWindow;

		SplitViewNav.detailWindow = Ti.UI.createWindow({
			title:'Detail',
			backgroundColor:'#336699'
		});

		SplitViewNav.detailNav = Ti.UI.iPhone.createNavigationGroup({
			window:SplitViewNav.detailWindow
		});

		SplitViewNav.splitView = Titanium.UI.iPad.createSplitWindow({
			masterView:tabGroupWindow,
			detailView:SplitViewNav.detailNav,
		});

		SplitViewNav.open = function() {
			tabGroup.open();
			SplitViewNav.splitView.open();
		};
		SplitViewNav.splitView.addEventListener('visible', function(e) {
			if (e.view == 'detail') {
				e.button.title = "Settings";
				SplitViewNav.detailWindow.leftNavButton = e.button;
			} else if (e.view == 'master') {
				SplitViewNav.detailWindow.leftNavButton = null;
			}
		});
		return SplitViewNav;
	};
	ar.ui.initTabGroup = function(_args) {
		var debugWin = Titanium.UI.createWindow({
			title: 'a debug window',
			backgroundColor:'#fff',
			barColor:'#111'
		});

		var debugTab = Titanium.UI.createTab({
			titleid:'Debug',
			icon:'images/settings.png',
			window:debugWin
		});

		tabGroup.addTab(debugTab);
		tabGroup.setActiveTab(0);

		var data = [{
			title:"Login",
			header: 'Fusion',
		}
		];

		var tableview = Ti.UI.createTableView({
			style:Ti.UI.iPhone.TableViewStyle.GROUPED,
			data:data
		});

		tableview.addEventListener('click', function(e) {
		});
		debugWin.add(tableview);
	};
	ar.ui.addTabWindow = function(win) {
		var tab = Titanium.UI.createTab({
			titleid:'New tab',
			icon:'images/settings.png',
			window:win
		});
		tabGroup.addTab(tab);
	}
	ar.ui.loadDetailWindow = function(win) {
		SplitViewNav.detailNav.open(win);
	}
})();